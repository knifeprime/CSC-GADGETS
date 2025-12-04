// ===== ANIMATED BACKGROUND PARTICLE SYSTEM =====
const canvas = document.getElementById("background-canvas")
const ctx = canvas.getContext("2d")

// Set canvas size
function resizeCanvas() {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
}
resizeCanvas()
window.addEventListener("resize", resizeCanvas)

// Particle class
class Particle {
  constructor(x = null, y = null, isExplosion = false) {
    if (isExplosion) {
      this.x = x
      this.y = y
      this.lifespan = 60
      this.maxLifespan = 60
      const angle = Math.random() * Math.PI * 2
      const speed = 2 + Math.random() * 3
      this.vx = Math.cos(angle) * speed
      this.vy = Math.sin(angle) * speed
      this.radius = Math.random() * 3 + 2
    } else {
      this.x = x !== null ? x : Math.random() * canvas.width
      this.y = y !== null ? y : Math.random() * canvas.height
      this.vx = (Math.random() - 0.5) * 0.5
      this.vy = (Math.random() - 0.5) * 0.5
      this.radius = Math.random() * 1.5 + 0.8
      this.lifespan = null
      this.maxLifespan = null
    }
    this.opacity = 0.6
    this.originalOpacity = this.opacity
  }

  update() {
    this.x += this.vx
    this.y += this.vy

    if (this.lifespan !== null) {
      this.lifespan--
      this.opacity = (this.lifespan / this.maxLifespan) * 0.8
    }

    // Bounce off walls for regular particles
    if (this.lifespan === null) {
      if (this.x < 0 || this.x > canvas.width) this.vx *= -1
      if (this.y < 0 || this.y > canvas.height) this.vy *= -1
      this.x = Math.max(0, Math.min(canvas.width, this.x))
      this.y = Math.max(0, Math.min(canvas.height, this.y))
    }
  }

  draw() {
    ctx.fillStyle = `rgba(0, 217, 255, ${this.opacity})`
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
    ctx.fill()

    // Glow effect
    ctx.fillStyle = `rgba(0, 217, 255, ${this.opacity * 0.2})`
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius + 2, 0, Math.PI * 2)
    ctx.fill()
  }

  distanceTo(x, y) {
    const dx = this.x - x
    const dy = this.y - y
    return Math.sqrt(dx * dx + dy * dy)
  }
}

const particleCount = 25
const particles = []
const explosionParticles = []

for (let i = 0; i < particleCount; i++) {
  particles.push(new Particle())
}

// Mouse position tracking
let mouseX = canvas.width / 2
let mouseY = canvas.height / 2

document.addEventListener("click", (e) => {
  const mouseX = e.clientX
  const mouseY = e.clientY

  // Create explosion burst particles
  for (let i = 0; i < 12; i++) {
    explosionParticles.push(new Particle(mouseX, mouseY, true))
  }
})

function drawConnections() {
  const maxDistance = 120

  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x
      const dy = particles[i].y - particles[j].y
      const distance = Math.sqrt(dx * dx + dy * dy)

      if (distance < maxDistance) {
        const opacity = (1 - distance / maxDistance) * 0.15
        ctx.strokeStyle = `rgba(0, 217, 255, ${opacity})`
        ctx.lineWidth = 0.8
        ctx.beginPath()
        ctx.moveTo(particles[i].x, particles[i].y)
        ctx.lineTo(particles[j].x, particles[j].y)
        ctx.stroke()
      }
    }
  }
}

// Animation loop
function animate() {
  ctx.fillStyle = "rgba(15, 15, 30, 1)"
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  // Update and draw background particles
  particles.forEach((particle) => {
    particle.update()
    particle.draw()
  })

  for (let i = explosionParticles.length - 1; i >= 0; i--) {
    explosionParticles[i].update()
    explosionParticles[i].draw()
    if (explosionParticles[i].lifespan <= 0) {
      explosionParticles.splice(i, 1)
    }
  }

  // Draw connections
  drawConnections()

  requestAnimationFrame(animate)
}

animate()

// ===== CUSTOM CURSOR LOGIC =====
const cursor = document.querySelector(".cursor")
let cursorX = 0
let cursorY = 0
const speed = 0.2

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX
  mouseY = e.clientY
})

// Continuous smooth animation loop for cursor following
function animateCursor() {
  cursorX += (mouseX - cursorX) * speed
  cursorY += (mouseY - cursorY) * speed
  cursor.style.transform = `translate(${cursorX - 10}px, ${cursorY - 10}px)`
  requestAnimationFrame(animateCursor)
}

animateCursor()

// Expand cursor on hover over interactive elements
const interactiveElements = document.querySelectorAll("button, a, input, .notification-bell, .product-card")

interactiveElements.forEach((element) => {
  element.addEventListener("mouseenter", () => {
    cursor.style.width = "40px"
    cursor.style.height = "40px"
    cursor.style.borderWidth = "3px"
    cursor.style.boxShadow = "0 0 20px rgba(0, 217, 255, 0.8)"
  })

  element.addEventListener("mouseleave", () => {
    cursor.style.width = "20px"
    cursor.style.height = "20px"
    cursor.style.borderWidth = "2px"
    cursor.style.boxShadow = "0 0 10px rgba(0, 217, 255, 0.5)"
  })
})

// Hide cursor when leaving window
document.addEventListener("mouseleave", () => {
  cursor.classList.add("hidden")
})

document.addEventListener("mouseenter", () => {
  cursor.classList.remove("hidden")
})

// ===== SCROLL REVEAL ANIMATION =====
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active")
      observer.unobserve(entry.target)
    }
  })
}, observerOptions)

// Observe all reveal elements
document.querySelectorAll(".reveal").forEach((element) => {
  observer.observe(element)
})
