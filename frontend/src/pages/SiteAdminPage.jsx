import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchAllSiteImages } from '../features/site/siteSlice'
import PageImageControl from '../Site Admin/PageImageControl'

const SiteAdminPage = () => {
  const dispatch = useDispatch()
  const { images, isLoading, isImagesLoaded, error } = useSelector(
    (state) => state.site
  )

  // Fetch all images when component mounts
  useEffect(() => {
    if (!isImagesLoaded) {
      dispatch(fetchAllSiteImages())
    }
  }, [dispatch, isImagesLoaded])

  // Show loading state
  if (isLoading && !isImagesLoaded) {
    return (
      <div className='site-admin-page-wrap'>
        <section className='admin-page-head-section'>
          <p className='site-admin-section-p'>
            site admin page
            <i className='site-admin-icon fa-solid fa-screwdriver-wrench'></i>
          </p>
        </section>

        <section className='site-admin-control-section'>
          <div style={styles.loadingContainer}>
            <div style={styles.spinner}></div>
            <p style={styles.loadingText}>Loading site images...</p>
          </div>
        </section>
      </div>
    )
  }

  // Show error state
  if (error && !isImagesLoaded) {
    return (
      <div className='site-admin-page-wrap'>
        <section className='admin-page-head-section'>
          <p className='site-admin-section-p'>
            site admin page
            <i className='site-admin-icon fa-solid fa-screwdriver-wrench'></i>
          </p>
        </section>

        <section className='site-admin-control-section'>
          <div style={styles.errorContainer}>
            <p style={styles.errorText}>Error loading images: {error}</p>
            <button
              style={styles.retryButton}
              onClick={() => dispatch(fetchAllSiteImages())}
            >
              Retry
            </button>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className='site-admin-page-wrap'>
      <section className='admin-page-head-section'>
        <p className='site-admin-section-p'>
          site admin page
          <i className='site-admin-icon fa-solid fa-screwdriver-wrench'></i>
        </p>
      </section>

      <section className='site-admin-control-section'>
        <div className='site-admin-grid-item'>
          <p className='site-admin-grid-p'>
            Home Page Image
            <i className='fa-solid site-admin-card-icon fa-house-chimney'></i>
          </p>

          {/* Show current image if it exists */}
          {images.homePage && (
            <div style={styles.currentImageContainer}>
              <p style={styles.currentImageLabel}>Current Image:</p>
              <img
                src={images.homePage}
                alt='Current home page'
                style={styles.currentImage}
              />
            </div>
          )}

          <PageImageControl page='homePage' />
        </div>

        <div className='site-admin-grid-item'>
          <p className='site-admin-grid-p'>
            Register Page Image
            <i className='fa-solid site-admin-card-icon fa-arrow-right-to-bracket'></i>
          </p>

          {images.registerPage && (
            <div style={styles.currentImageContainer}>
              <p style={styles.currentImageLabel}>Current Image:</p>
              <img
                src={images.registerPage}
                alt='Current register page'
                style={styles.currentImage}
              />
            </div>
          )}

          <PageImageControl page='registerPage' />
        </div>

        <div className='site-admin-grid-item'>
          <p className='site-admin-grid-p'>
            Login Page Image
            <i className='fa-solid site-admin-card-icon fa-user'></i>
          </p>

          {images.loginPage && (
            <div style={styles.currentImageContainer}>
              <p style={styles.currentImageLabel}>Current Image:</p>
              <img
                src={images.loginPage}
                alt='Current login page'
                style={styles.currentImage}
              />
            </div>
          )}

          <PageImageControl page='loginPage' />
        </div>
      </section>
    </div>
  )
}

const styles = {
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '3rem',
    textAlign: 'center',
  },

  spinner: {
    width: '40px',
    height: '40px',
    border: '4px solid #f3f3f3',
    borderTop: '4px solid #3b82f6',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    marginBottom: '1rem',
  },

  loadingText: {
    fontSize: '1.1rem',
    color: '#6b7280',
    margin: 0,
  },

  errorContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '3rem',
    textAlign: 'center',
  },

  errorText: {
    fontSize: '1.1rem',
    color: '#dc2626',
    marginBottom: '1rem',
  },

  retryButton: {
    padding: '0.75rem 1.5rem',
    backgroundColor: '#3b82f6',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '600',
  },

  currentImageContainer: {
    marginBottom: '1rem',
    textAlign: 'center',
  },

  currentImageLabel: {
    fontSize: '0.875rem',
    fontWeight: '600',
    color: '#374151',
    marginBottom: '0.5rem',
  },

  currentImage: {
    maxWidth: '200px',
    maxHeight: '120px',
    objectFit: 'cover',
    borderRadius: '8px',
    border: '2px solid #e5e7eb',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
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
  if (!document.head.querySelector('style[data-spinner]')) {
    styleSheet.setAttribute('data-spinner', 'true')
    document.head.appendChild(styleSheet)
  }
}

export default SiteAdminPage
