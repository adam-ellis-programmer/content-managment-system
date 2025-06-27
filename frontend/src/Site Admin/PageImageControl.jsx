import React, { useState } from 'react'
import {
  updateImg,
  clearError,
  setPageImage,
  fetchAllSiteImages,
} from '../features/site/siteSlice'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { API_BASE_URL } from '../config/api'

const PageImageControl = ({ page }) => {
  const dispatch = useDispatch()
  const [isDragging, setIsDragging] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)
  const [localLoading, setLocalLoading] = useState(false)

  // Get site state from Redux store
  const { isLoading, error, images } = useSelector((state) => state.site)

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    const files = e.dataTransfer.files
    if (files.length > 0 && files[0].type.startsWith('image/')) {
      setFile(files[0])
    }
  }

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setFile(e.target.files[0])
    }
  }

  const setFile = (file) => {
    setSelectedFile(file)

    // Clean up previous preview URL
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl)
    }

    // Create new preview URL
    const newPreviewUrl = URL.createObjectURL(file)
    setPreviewUrl(newPreviewUrl)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!selectedFile) {
      alert('Please select a file first')
      return
    }

    setLocalLoading(true)

    try {
      const formData = new FormData()
      formData.append('image', selectedFile)
      formData.append('imgPlace', page)

      const response = await axios.post(
        `${API_BASE_URL}/api/site/upload-image`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      )

      if (response.data.success) {
        // Update Redux store with new image URL
        dispatch(
          setPageImage({
            imgPlace: page,
            imageUrl: response.data.imageUrl,
          })
        )

        // Clear selected file and preview
        setSelectedFile(null)
        if (previewUrl) {
          URL.revokeObjectURL(previewUrl)
          setPreviewUrl(null)
        }

        // Reset file input
        const fileInput = document.querySelector(`input[type="file"]`)
        if (fileInput) fileInput.value = ''

        alert(response.data.msg)

        // Optionally refresh all images to ensure consistency
        // dispatch(fetchAllSiteImages())
      }
    } catch (error) {
      console.error('Upload error:', error)
      alert(
        'Error uploading image: ' + (error.response?.data?.msg || error.message)
      )
    } finally {
      setLocalLoading(false)
    }
  }

  const handleTestApi = () => {
    console.log('testing api...')
    // Test the Redux updateImg thunk
    const formData = new FormData()
    formData.append('imgPlace', page)
    dispatch(updateImg(formData))
  }

  const isUploading = isLoading || localLoading
  const currentImage = images[page]

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div
          style={{
            ...styles.uploadArea,
            ...(isDragging ? styles.uploadAreaDragging : {}),
            ...(selectedFile ? styles.uploadAreaWithFile : {}),
          }}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div style={styles.uploadIcon}>{selectedFile ? '✓' : '📁'}</div>

          <div style={styles.uploadText}>
            {selectedFile ? (
              <>
                <div style={styles.fileName}>{selectedFile.name}</div>
                <div style={styles.fileSize}>
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </div>
              </>
            ) : (
              <>
                <div style={styles.primaryText}>
                  {currentImage
                    ? `Replace ${page} image`
                    : `Drop your ${page} image here`}
                </div>
                <div style={styles.secondaryText}>or click to browse</div>
              </>
            )}
          </div>

          <input
            type='file'
            style={styles.fileInput}
            onChange={handleFileChange}
            accept='image/*'
            disabled={isUploading}
          />
        </div>

        {/* Preview Selected Image */}
        {previewUrl && (
          <div style={styles.previewSection}>
            <div style={styles.previewLabel}>Preview:</div>
            <div style={styles.previewContainer}>
              <img src={previewUrl} alt='Preview' style={styles.previewImage} />
            </div>
          </div>
        )}

        <button
          type='submit'
          style={{
            ...styles.submitButton,
            ...(selectedFile && !isUploading ? styles.submitButtonActive : {}),
            ...(isUploading ? styles.submitButtonLoading : {}),
          }}
          disabled={!selectedFile || isUploading}
        >
          {isUploading ? (
            <>
              <span style={styles.spinner}></span>
              {currentImage ? 'Replacing...' : 'Uploading...'}
            </>
          ) : selectedFile ? (
            currentImage ? (
              `Replace ${page} Image`
            ) : (
              `Upload ${page} Image`
            )
          ) : (
            'Select a file first'
          )}
        </button>
      </form>

      {/* Error Display */}
      {error && <div style={styles.errorMessage}>Error: {error}</div>}

      <div className='test-btn-wrap'>
        <button onClick={handleTestApi} style={styles.testButton}>
          test api
        </button>
      </div>
    </div>
  )
}

const styles = {
  container: {
    maxWidth: '400px',
    margin: '2rem auto',
    padding: '2rem',
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },

  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },

  uploadArea: {
    position: 'relative',
    borderWidth: '2px',
    borderStyle: 'dashed',
    borderColor: '#e2e8f0',
    borderRadius: '12px',
    padding: '3rem 2rem',
    textAlign: 'center',
    backgroundColor: '#fafafa',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    backgroundImage:
      'radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.05) 0%, transparent 70%)',
  },

  uploadAreaDragging: {
    borderColor: '#3b82f6',
    backgroundColor: '#eff6ff',
    transform: 'scale(1.02)',
    boxShadow: '0 10px 25px rgba(59, 130, 246, 0.15)',
  },

  uploadAreaWithFile: {
    borderColor: '#10b981',
    backgroundColor: '#f0fdf4',
    borderStyle: 'solid',
  },

  uploadIcon: {
    fontSize: '3rem',
    marginBottom: '1rem',
    color: '#6b7280',
    transition: 'all 0.3s ease',
  },

  uploadText: {
    color: '#374151',
  },

  primaryText: {
    fontSize: '1.125rem',
    fontWeight: '600',
    marginBottom: '0.5rem',
    color: '#1f2937',
  },

  secondaryText: {
    fontSize: '0.875rem',
    color: '#6b7280',
  },

  fileName: {
    fontSize: '1rem',
    fontWeight: '600',
    color: '#059669',
    marginBottom: '0.25rem',
  },

  fileSize: {
    fontSize: '0.875rem',
    color: '#6b7280',
  },

  fileInput: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    opacity: 0,
    cursor: 'pointer',
  },

  previewSection: {
    textAlign: 'center',
  },

  previewLabel: {
    fontSize: '0.875rem',
    fontWeight: '600',
    color: '#374151',
    marginBottom: '0.5rem',
  },

  previewContainer: {
    display: 'inline-block',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    border: '2px solid #e5e7eb',
  },

  previewImage: {
    maxWidth: '200px',
    maxHeight: '150px',
    objectFit: 'cover',
    display: 'block',
  },

  submitButton: {
    padding: '0.875rem 2rem',
    borderRadius: '8px',
    border: 'none',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    backgroundColor: '#e5e7eb',
    color: '#9ca3af',
    transform: 'translateY(0)',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
  },

  submitButtonActive: {
    backgroundColor: '#3b82f6',
    color: 'white',
    cursor: 'pointer',
    boxShadow: '0 4px 14px rgba(59, 130, 246, 0.3)',
  },

  submitButtonLoading: {
    backgroundColor: '#6b7280',
    cursor: 'not-allowed',
  },

  spinner: {
    width: '16px',
    height: '16px',
    border: '2px solid #ffffff',
    borderTop: '2px solid transparent',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },

  errorMessage: {
    backgroundColor: '#fef2f2',
    border: '1px solid #fecaca',
    color: '#dc2626',
    padding: '0.75rem',
    borderRadius: '6px',
    fontSize: '0.875rem',
    marginTop: '1rem',
  },

  testButton: {
    padding: '0.5rem 1rem',
    backgroundColor: '#f3f4f6',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '0.875rem',
    marginTop: '1rem',
  },
}

// Add CSS animation for spinner
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style')
  styleSheet.textContent = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `
  if (!document.head.querySelector('style[data-page-image-spinner]')) {
    styleSheet.setAttribute('data-page-image-spinner', 'true')
    document.head.appendChild(styleSheet)
  }
}

export default PageImageControl
