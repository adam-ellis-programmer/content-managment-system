import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getPublicBlogs } from '../features/blog/blogSlice'
import { fetchAllSiteImages } from '../features/site/siteSlice' // Add this import

import EmailSignUpForm from '../components/EmailSignUpForm'
import FeaturedBlogItem from '../components/FeaturedBlogItem'

import HomeLoader from '../components/loaders/HomeLoader'
import tempImg from '../img/temp-imgs/home-1.jpg' // Keep as fallback
import { scrollTop } from '../utils'
import useCheckDemoUser from '../hooks/useCheckDemoUser'

function Home() {
  const { isDemo } = useCheckDemoUser()
  const dispatch = useDispatch()
  const { publicBlogs } = useSelector((state) => state.blogs)
  const { user } = useSelector((state) => state.auth)

  // Get site images from Redux store
  const { images, isImagesLoaded } = useSelector((state) => state.site)

  useEffect(() => {
    scrollTop()
    return () => {}
  }, [])

  useEffect(() => {
    dispatch(getPublicBlogs())

    // Fetch site images if not already loaded
    if (!isImagesLoaded) {
      dispatch(fetchAllSiteImages())
    }
  }, [dispatch, isImagesLoaded])

  // find only featured blogs
  const filtered =
    publicBlogs && Array.isArray(publicBlogs)
      ? publicBlogs.filter((item) => item.featured === true)
      : []

  // Programaticly display welcome (name) or welcome for the first time registered
  function greeting() {
    if (user && user.logins < 1) {
      return `welcome  ${user.name.split(' ')[0]}`
    }
    if (user && user.logins > 0) {
      return `welcome back ${user.name.split(' ')[0]}`
    }
  }

  // Get the home page image from database, fallback to temp image
  const homePageImage = images?.homePage || tempImg

  return (
    <>
      <section className='home-hero'>
        <img
          className='home-main-img'
          src={homePageImage}
          alt='Home page hero image'
          onError={(e) => {
            // Fallback to temp image if database image fails to load
            if (e.target.src !== tempImg) {
              e.target.src = tempImg
            }
          }}
        />
        <div className='home-img-overlay'>hello</div>
        <div className='home-hero-header-container'>
          <div className='home-hero-content'>
            <div className='hero-head-container'>
              <p>{greeting()}</p>
              <h1>creative beginnings</h1>
              <p>your blogging journey</p>
              <p>starts here</p>
              {!user && (
                <p className='home-info-p'>login or register to get started </p>
              )}
            </div>

            <div className='hero-form-container'>
              <EmailSignUpForm />
            </div>
          </div>
          <div className='home-hero-content-container'>
            {/* <p>hello</p> */}
          </div>
        </div>
      </section>

      <div className='page-container'>
        <div className='featured-blogs-header-container'>
          <h2>
            <span>FEATURED BLOG ARTICLES ON THE GO</span>
          </h2>
          <p>read some of our bloggers featured content </p>
          <p>
            from america to new zealand we have an array of interesting reads{' '}
          </p>
          <p>to inspire your next trip </p>
        </div>
        {!publicBlogs && <HomeLoader />}
        {publicBlogs && publicBlogs.length < 1 && (
          <div className='home-no-blogs-div'>
            <h3>no featured blogs yet!</h3>
          </div>
        )}
        <section className='home-blog-posts'>
          {filtered &&
            filtered.length > 0 &&
            filtered.map((blog) => (
              <FeaturedBlogItem key={blog._id} blog={blog} />
            ))}
        </section>
      </div>
    </>
  )
}

export default Home
