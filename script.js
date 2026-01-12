
const typingTextElement = document.getElementById('typing-text');
const textsToType = [
    "Saya seorang Web Developer.",
    "Saya seorang UI/UX Designer.",
    "Saya seorang Creative Technologist.",
    "Siap wujudkan ide Anda!"
];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingSpeed = 100; 
const deletingSpeed = 50; 
const pauseTime = 1500; 

function type() {
    const currentText = textsToType[textIndex];
    
    if (isDeleting) {
        typingTextElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingTextElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }

    let speed = isDeleting ? deletingSpeed : typingSpeed;

    if (!isDeleting && charIndex === currentText.length) {
        speed = pauseTime;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % textsToType.length;
    }

    setTimeout(type, speed);
}

document.addEventListener('DOMContentLoaded', () => {
    type();
});



const modeToggle = document.getElementById('mode-toggle');
const body = document.body;

function setMode(isDark) {
    if (isDark) {
        body.classList.add('dark-mode');
        modeToggle.textContent = '🌙'; 
        localStorage.setItem('theme', 'dark');
    } else {
        body.classList.remove('dark-mode');
        modeToggle.textContent = '☀️'; 
        localStorage.setItem('theme', 'light');
    }
}

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    setMode(true);
} else {
    setMode(false); 
}

modeToggle.addEventListener('click', () => {
    const isDarkModeActive = body.classList.contains('dark-mode');
    setMode(!isDarkModeActive); 
});

window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.2)';
    } else {
        header.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
    }
});

function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-bar');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const level = bar.getAttribute('data-level'); 
                bar.style.width = level + '%';
                
                observer.unobserve(bar);
            }
        });
    }, {
        threshold: 0.5 
    });

    skillBars.forEach(bar => {
        observer.observe(bar);
    });
}

document.addEventListener('DOMContentLoaded', () => {

    animateSkillBars(); 
});

const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

contactForm.addEventListener('submit', function(event) {
    event.preventDefault(); 


    formStatus.textContent = "Mengirim pesan...";
    formStatus.style.color = '#007bff'; 

    setTimeout(() => {
        formStatus.textContent = "✅ Pesan berhasil terkirim! Saya akan merespons secepatnya.";
        formStatus.style.color = 'green';
        contactForm.reset(); 

        setTimeout(() => {
            formStatus.textContent = "";
        }, 5000); 

    }, 3000); 
});


document.addEventListener('DOMContentLoaded', () => {

    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            projectCards.forEach(card => {
                const categories = card.getAttribute('data-category').split(' ');
                
                card.classList.add('hidden');
                card.classList.remove('visible');
                
                setTimeout(() => {
                    if (filterValue === 'all' || categories.includes(filterValue)) {
                        card.classList.remove('hidden');
                        setTimeout(() => {
                            card.classList.add('visible');
                        }, 50); 
                    }
                }, 300); 
            });
        });
    });

    document.querySelector('.filter-btn[data-filter="all"]').click();
});