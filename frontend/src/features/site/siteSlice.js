// features/site/siteSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { API_BASE_URL } from '../../config/api'

// Async thunk to fetch all site images
export const fetchAllSiteImages = createAsyncThunk(
  'site/fetchAllImages',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/site/images`)
      return response.data
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.msg || 'Failed to fetch site images'
      )
    }
  }
)

// Async thunk to update an image
export const updateImg = createAsyncThunk(
  'site/updateImage',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/site/upload-image`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      )
      return response.data
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.msg || 'Failed to update image'
      )
    }
  }
)

const initialState = {
  images: {
    homePage: null,
    registerPage: null,
    loginPage: null,
  },
  isLoading: false,
  isImagesLoaded: false,
  error: null,
}

const siteSlice = createSlice({
  name: 'site',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
    setPageImage: (state, action) => {
      const { imgPlace, imageUrl } = action.payload
      if (state.images.hasOwnProperty(imgPlace)) {
        state.images[imgPlace] = imageUrl
      }
    },
    // Reset images state
    resetImages: (state) => {
      state.images = initialState.images
      state.isImagesLoaded = false
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all images cases
      .addCase(fetchAllSiteImages.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchAllSiteImages.fulfilled, (state, action) => {
        state.isLoading = false
        state.isImagesLoaded = true
        state.error = null

        // Reset images first
        state.images = { ...initialState.images }

        // Map the fetched images to their respective pages
        if (action.payload.success && action.payload.images) {
          action.payload.images.forEach((image) => {
            if (state.images.hasOwnProperty(image.imgPlace)) {
              state.images[image.imgPlace] = image.imageUrl
            }
          })
        }
      })
      .addCase(fetchAllSiteImages.rejected, (state, action) => {
        state.isLoading = false
        state.isImagesLoaded = false
        state.error = action.payload
      })

      // Update image cases
      .addCase(updateImg.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(updateImg.fulfilled, (state, action) => {
        state.isLoading = false
        state.error = null
        // The image will be updated by setPageImage action in the component
      })
      .addCase(updateImg.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
  },
})

export const { clearError, setPageImage, resetImages } = siteSlice.actions

export default siteSlice.reducer
