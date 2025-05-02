<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="shortcut icon" href="./img/s-logo.png" type="image/x-icon">
    <title>Laserina Resort</title>


</head>
<style>
    :root {
        --primary-color: rgb(29, 103, 172);
        --border-color: #e0e0e0;
        --secondary-color: rgb(25, 94, 158);
        --accent-color: rgb(28, 91, 150);

        --border-radius: 8px;
        --box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);

    }

    .hero-banner {
        position: relative;
        width: 100%;
        height: 100vh;
        background-image: url(img/resort-gallery/kiddiepool.png);
        background-attachment: fixed;
        background-size: cover;
        background-position: center;
        display: flex;
        align-items: center;
        overflow: hidden;
    }

    /* Dark overlay with improved opacity */
    .hero-banner::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(to right, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.2));
        z-index: 1;
    }

    /* Animated particles overlay */
    .particles {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        z-index: 1;
    }

    .particle {
        position: absolute;
        display: block;
        background: rgba(255, 255, 255, 0.2);
        border-radius: 50%;
        animation: float 15s infinite linear;
    }

    @keyframes float {
        0% {
            transform: translateY(0) translateX(0) rotate(0deg);
            opacity: 1;
        }

        100% {
            transform: translateY(-100vh) translateX(100vw) rotate(360deg);
            opacity: 0;
        }
    }

    /* Enhanced left overlay with modern gradient */
    .overlay-left {
        position: absolute;
        top: 0;
        left: 0;
        width: 50%;
        height: 100%;
        background: linear-gradient(135deg, rgba(15, 15, 25, 0.95) 30%, rgba(20, 20, 30, 0.8) 70%, transparent);
        clip-path: polygon(0 0, 90% 0, 75% 100%, 0 100%);
        display: flex;
        align-items: center;
        padding-left: 8%;
        padding-bottom: 5%;
        z-index: 4;
        box-shadow: 10px 0 30px rgba(0, 0, 0, 0.3);
    }

    /* Animated shape in background */
    .shape-divider {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 120px;
        z-index: 3;
    }

    .shape-divider svg {
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 120px;
    }

    .company-info {
        color: white;
        max-width: 80%;
        animation: fadeInUp 1.2s ease-out;
        position: relative;
    }

    /* Enhanced animations */
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }

        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes slideInLeft {
        from {
            opacity: 0;
            transform: translateX(-30px);
        }

        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    /* Improved company logo */
    .company-logo {
        width: 140px;
        transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.2));
        animation: slideInLeft 1s ease-out;
    }

    .company-logo:hover {
        transform: scale(1.08) rotate(2deg);
    }

    /* Enhanced company name styling */
    .company-name {
        font-size: 3.8rem;
        font-weight: 700;
        line-height: 1.1;
        margin-bottom: 20px;
        text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        position: relative;
        animation: fadeInUp 1.2s ease-out 0.2s both;
    }

    .company-name .systems {
        display: block;
        color:rgb(29, 103, 172);
        position: relative;
    }

    .company-name .systems::after {
        content: '';
        position: absolute;
        bottom: -8px;
        left: 0;
        width: 60px;
        height: 4px;

        border-radius: 2px;
        animation: expandWidth 1.2s ease-out 1.4s forwards;
        transform-origin: left;
        transform: scaleX(0);
    }

    @keyframes expandWidth {
        to {
            transform: scaleX(1);
        }
    }

    /* Enhanced tagline styling */
    .company-tagline {
        font-size: 1.3rem;
        font-weight: 300;
        color: #f0f0f0;
        letter-spacing: 1.2px;
        position: relative;
        padding-bottom: 25px;
        margin-bottom: 25px;
        max-width: 340px;
        opacity: 0;
        animation: fadeInUp 1s ease-out 0.4s forwards;
    }

    .company-tagline::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 80px;
        height: 3px;
        background: linear-gradient(to right, rgb(29, 103, 172), rgb(22, 78, 131));
        border-radius: 1.5px;
    }

    /* Enhanced call to action button */
    .cta-button {
        display: inline-block;
        padding: 15px 35px;
        background: linear-gradient(135deg, rgb(29, 103, 172), rgb(22, 78, 131));
        color: white;
        text-decoration: none;
        border-radius: 30px;
        font-weight: 600;
        font-size: 1.1rem;
        letter-spacing: 0.6px;
        box-shadow: 0 6px 18px rgb(29, 103, 172);
        transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        border: none;
        cursor: pointer;
        margin-top: 15px;
        position: relative;

        overflow: hidden;
        opacity: 0;
        animation: fadeInUp 1s ease-out 0.6s forwards;
    }

    .cta-button::before {

        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
        transition: left 0.7s ease;
        pointer-events: none;
        /* Prevents it from blocking hover */
    }

    .cta-button:hover {
        transform: translateY(-4px);
        box-shadow: 0 8px 25px rgb(22, 78, 131);
    }

    .cta-button:hover::before {
        left: 100%;
    }

    .cta-button:active {
        transform: translateY(-1px);
        box-shadow: 0 4px 15px rgb(25, 94, 158);
    }

    /* Additional tech-themed elements */
    .tech-accent {
        position: absolute;
        top: -20px;
        right: -40px;
        width: 150px;
        height: 150px;
        border: 2px solid rgb(25, 94, 158);
        border-radius: 50%;
        animation: rotate 20s linear infinite;
        z-index: -1;
    }

    .tech-accent::before,
    .tech-accent::after {
        content: '';
        position: absolute;
        width: 10px;
        height: 10px;
        background: rgb(29, 103, 172);
        border-radius: 50%;
    }

    .tech-accent::before {
        top: 30px;
        left: 30px;
    }

    .tech-accent::after {
        bottom: 30px;
        right: 30px;
    }

    @keyframes rotate {
        from {
            transform: rotate(0deg);
        }

        to {
            transform: rotate(360deg);
        }
    }

    /* Section Divider */
    .section-divider {
        margin: 40px 0;
        text-align: center;
        position: relative;
    }

    .section-divider::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 0;
        right: 0;
        height: 1px;
        background-color: var(--border-color);
        z-index: 1;
    }

    .section-divider span {
        position: relative;
        z-index: 2;
        background-color: white;
        padding: 0 20px;
        font-size: 18px;
        font-weight: 600;
        color: var(--primary-color);
    }

    /*  slider */


    .carousel-container {
        max-width: 1100px;
        margin: 0 auto;
        position: relative;
        overflow: hidden;
        border-radius: 12px;
        box-shadow: 0 15px 30px -8px rgba(0, 0, 0, 0.1);
    }

    .carousel {
        display: flex;
        transition: transform 0.7s cubic-bezier(0.645, 0.045, 0.355, 1);
    }

    .slide {
        min-width: 100%;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        background-size: cover;
        background-position: center;
        height: 400px;
        perspective: 1000px;
    }

    .slide::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(to right, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.3));
    }

    .slide-content {
        text-align: center;
        color: white;
        padding: 1.5rem;
        border-radius: 12px;
        max-width: 800px;
        width: 90%;
        position: relative;
        z-index: 10;
        transform: translateZ(50px);
        opacity: 0;
        transition: all 0.7s ease-out;
    }

    .slide.active .slide-content {
        opacity: 1;
        transform: translateZ(0);
    }

    .slide-content h2 {
        margin-bottom: 1rem;
        font-size: 2.2rem;
        font-weight: 700;
        text-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .slide-content p {
        margin-bottom: 1.5rem;
        font-size: 1rem;
        line-height: 1.6;
        opacity: 0.9;
    }

    .read-more {
        display: inline-block;
        background: linear-gradient(135deg, rgb(29, 103, 172), rgb(25, 94, 158));
        color: white;
        text-decoration: none;
        padding: 10px 20px;
        border-radius: 8px;
        font-weight: 600;
        transition: all 0.3s ease;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    }

    .read-more:hover {
        background-color: #2563eb;
        transform: translateY(-3px);
        box-shadow: 0 8px 25px rgb(25, 94, 158);
    }

    .carousel-nav {
        position: absolute;
        top: 50%;
        width: 100%;
        display: flex;
        justify-content: space-between;
        transform: translateY(-50%);
        z-index: 20;
    }

    .nav-btn {
        background: rgba(255, 255, 255, 0.2);
        color: white;
        border: none;
        font-size: 1.5rem;
        padding: 10px 15px;
        cursor: pointer;
        backdrop-filter: blur(10px);
        border-radius: 8px;
        transition: all 0.3s ease;
    }

    .nav-btn:hover {
        background: rgba(255, 255, 255, 0.3);
        transform: scale(1.1);
    }

    .slide-indicator {
        position: absolute;
        bottom: 15px;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        gap: 8px;
    }

    .indicator {
        width: 8px;
        height: 8px;
        background: rgba(255, 255, 255, 0.5);
        border-radius: 50%;
        cursor: pointer;
        transition: all 0.3s ease;
    }

    .indicator.active {
        background: white;
        width: 16px;
        border-radius: 10px;
    }

    .client-portfolio-banner {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 1200px;
        max-width: 2000px;
        margin: 2rem auto;
        padding: 0 15px;
    }

    .client-portfolio-banner img {

        width: 1200px;
        height: auto;
        object-fit: contain;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        border-radius: 8px;
    }


    .work-section {
        display: flex;
        align-items: center;
        gap: 40px;
        margin-bottom: 70px;
    }

    .work-image {
        flex: 1;
        max-width: 45%;
        border-radius: var(--border-radius);
        overflow: hidden;
        box-shadow: var(--box-shadow);
        position: relative;
        background: transparent;
    }

    .work-image img {
        width: 100%;
        height: 430px;
        display: block;
        transition: transform 0.5s ease;
    }

    .work-image:hover img {
        transform: scale(1.05);
    }

    .work-text {
        flex: 1;
        padding: 20px;
        text-align: center;
    }

    .work-text h3 {
        font-size: 1.8rem;
        margin-bottom: 20px;
        color: var(--secondary-color);
        display: flex;
        align-items: center;
    }

    .work-text h3 i {
        margin-right: 15px;
        color: var(--accent-color);
    }

    .work-text p {
        font-size: 1.1rem;
        line-height: 1.8;
        margin-bottom: 20px;
    }

    .stainless-works {
        flex-direction: row-reverse;
    }

    /* Enhanced responsive tweaks */
    @media (max-width: 1200px) {
        .company-name {
            font-size: 3.2rem;
        }

        .tech-accent {
            width: 150px;
            height: 150px;
        }
    }

    @media (max-width: 992px) {
        .overlay-left {
            width: 55%;
            clip-path: polygon(0 0, 92% 0, 80% 100%, 0 100%);
        }

        .company-logo {
            width: 120px;
        }

        .company-tagline {
            font-size: 1.2rem;
        }
    }

    @media (max-width: 768px) {
        .overlay-left {
            width: 70%;
            clip-path: polygon(0 0, 95% 0, 88% 100%, 0 100%);
            padding-left: 6%;
        }

        .company-name {
            font-size: 2.7rem;
        }

        .company-tagline {
            font-size: 1.1rem;
            max-width: 300px;
        }

        .company-logo {
            width: 110px;
            margin-bottom: 20px;
        }

        .tech-accent {
            width: 120px;
            height: 120px;
            top: -30px;
            right: -30px;
        }
    }

    @media (max-width: 576px) {
        .overlay-left {
            width: 90%;
            clip-path: polygon(0 0, 100% 0, 93% 100%, 0 100%);
            padding-left: 8%;
        }

        .company-name {
            font-size: 2.4rem;
        }

        .company-tagline {
            font-size: 1rem;
            max-width: 270px;
        }

        .company-info {
            max-width: 90%;
        }

        .cta-button {
            padding: 13px 28px;
            font-size: 1rem;
        }

        .tech-accent {
            display: none;
        }
    }
</style>

<body>
    <?php include "includes/navbar.php"; ?>
    <?php include 'includes/style.php'; ?>

    <div class="hero-banner">
        <div class="particles">
            <!-- Particles will be added via JavaScript -->
        </div>
        <div class="overlay-left">
            <div class="company-info">
                <div class="tech-accent"></div>
                <img class="company-logo" src="img/s-logo.png" alt="Intellitech Systems Logo">
                <h1 class="company-name">Laserina <span class="systems">Resort</span></h1>
                <p class="company-tagline">A Place of Comfort and Convenience</p>
                <a href="cottages.php" class="cta-button">Book now</a>
            </div>

        </div>
        <div class="shape-divider">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                <path
                    d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                    fill="rgba(255, 255, 255, 0.08)"></path>
            </svg>
        </div>
    </div>

    <div class="section-divider">
        <span>OUR GALLERY</span>
    </div>

    <div class="carousel-container">
        <div class="carousel">
            <div class="slide active" style="background-image: url('./img/resort-gallery/adultpool.png');">
                <div class="slide-content">
                    <h2>Adult Pool</h2>
                    <p>A&M Technology offers gate automation systems, delivering secure, convenient,
                        and efficient solutions for automated access control.</p>
                    <a href="#" class="read-more">Read More</a>
                </div>
            </div>
            <div class="slide" style="background-image: url('./img/resort-gallery/kiddiepool.png');">
                <div class="slide-content">
                    <h2>Kiddie Pool</h2>
                    <p>A&M Technology specializes in metal and steel fabrication,
                        providing customized solutions for durable and high-quality structural and industrial needs.</p>
                </div>
            </div>
            <div class="slide" style="background-image: url('./img/resort-gallery/souvenirshop.png');">
                <div class="slide-content">
                    <h2>Souvenir Shop</h2>
                    <p>A&M Technology offers pconstructed with multiple horizontal panels hinged together, allowing them to open vertically
                        and slide into horizontal tracks parallel to the garage ceiling, maximizing space inside and outside the garage. </p>
                </div>
            </div>
            <div class="slide" style="background-image: url('./img/resortentrance.png');">
                <div class="slide-content">
                    <h2>Resort Entrace</h2>
                    <p>A&M Technology provides doors that roll up into a tight coil above the opening, using horizontal slats that move vertically within tracks</p>
                </div>
            </div>
            <div class="slide" style="background-image: url('./img/resort-gallery/parking.png');">
                <div class="slide-content">
                    <h2>Parking Lot</h2>
                    <p>A&M Technology offers technology-driven perimeter security system that uses sensors, communication devices, and AI to detect, deter, and delay unauthorized intrusions, often with real-time alerts and remote monitoring capabilities</p>

                </div>
            </div>
            <div class="slide" style="background-image: url('./img/cottage-hero.png');">
                <div class="slide-content">
                    <h2>Cottages</h2>
                    <p>A&M Technology installs motorized curtains that can be opened and closed automatically, often via app control or integration with home automation systems, offering convenience, energy efficiency, and enhanced privacy</p>
                </div>
            </div>
        </div>
        <div class="carousel-nav">
            <button class="nav-btn prev-btn">&lt;</button>
            <button class="nav-btn next-btn">&gt;</button>
        </div>
        <div class="slide-indicator">
            <div class="indicator active"></div>
            <div class="indicator"></div>
            <div class="indicator"></div>
            <div class="indicator"></div>
            <div class="indicator"></div>
            <div class="indicator"></div>
        </div>
    </div>

    <div class="section-divider">
        <span>CLIENT PORTFOLIO</span>
    </div>

    <div class="client-portfolio-banner">
        <img src="img/resortbanner.jpg" alt="Intellitech Systems Client Portfolio">
    </div>

    <section class="client">
        <div class="container">


            <div class="work-section metal-works">
                <div class="work-image">
                    <img src="img/event-img/71.png" alt="Metal welding with sparks">
                </div>
                <div class="work-text">
                    <h3><i class="fas fa-fire"></i> Senator Ronald "Bato" Dela Rosa</h3>
                    <p>ARCOM STEELE</p>
                    <p>South Forbes Laguna</p>
                    <p>Fabrication And Installation of Automatic Bi-fold Gate</p>

                </div>
            </div>


            <div class="work-section stainless-works">
                <div class="work-image">
                    <img src="img/event-img/73.png" alt="Stainless steel welding with sparks">
                </div>
                <div class="work-text">
                    <h3><i class="fas fa-fire"></i> Senator Ronald "Bato" Dela Rosa</h3>
                    <p>ARCOM STEELE</p>
                    <p>South Forbes Laguna</p>
                    <p>Fabrication And Installation of Automatic Bi-fold Gate</p>

                </div>
            </div>
            <div class="work-section metal-works">
                <div class="work-image">
                    <img src="img/event-img/70.png" alt="Metal welding with sparks">
                </div>
                <div class="work-text">
                    <h3><i class="fas fa-fire"></i> Senator Ronald "Bato" Dela Rosa</h3>
                    <p>ARCOM STEELE</p>
                    <p>South Forbes Laguna</p>
                    <p>Fabrication And Installation of Automatic Bi-fold Gate</p>
                </div>
            </div>

            <div class="work-section stainless-works">
                <div class="work-image">
                    <img src="img/event-img/72.png" alt="Stainless steel welding with sparks">
                </div>
                <div class="work-text">
                    <h3><i class="fas fa-fire"></i> Senator Ronald "Bato" Dela Rosa</h3>
                    <p>ARCOM STEELE</p>
                    <p>South Forbes Laguna</p>
                    <p>Fabrication And Installation of Automatic Bi-fold Gate</p>

                </div>
            </div>

        </div>
    </section>

    <script>
        document.addEventListener('DOMContentLoaded', () => {
            const carousel = document.querySelector('.carousel');
            const prevBtn = document.querySelector('.prev-btn');
            const nextBtn = document.querySelector('.next-btn');
            const slides = document.querySelectorAll('.slide');
            const indicators = document.querySelectorAll('.indicator');
            let currentSlide = 0;

            function updateSlideState() {
                slides.forEach((slide, index) => {
                    slide.classList.toggle('active', index === currentSlide);
                });

                indicators.forEach((indicator, index) => {
                    indicator.classList.toggle('active', index === currentSlide);
                });
            }

            function moveSlide(direction) {
                slides[currentSlide].classList.remove('active');

                currentSlide += direction;

                if (currentSlide >= slides.length) currentSlide = 0;
                if (currentSlide < 0) currentSlide = slides.length - 1;

                carousel.style.transform = `translateX(-${currentSlide * 100}%)`;
                updateSlideState();
            }

            nextBtn.addEventListener('click', () => moveSlide(1));
            prevBtn.addEventListener('click', () => moveSlide(-1));

            // Add click event to indicators
            indicators.forEach((indicator, index) => {
                indicator.addEventListener('click', () => {
                    currentSlide = index;
                    carousel.style.transform = `translateX(-${currentSlide * 100}%)`;
                    updateSlideState();
                });
            });

            // Auto-slide every 5 seconds
            setInterval(() => moveSlide(1), 10000);
        });
    </script>
    <?php include 'includes/footer.php'; ?>

    <?php include "includes/main.php"; ?>


</body>

</html>