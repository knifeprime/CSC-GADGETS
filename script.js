// ===== CUSTOM CURSOR LOGIC =====
const cursor = document.querySelector(".cursor")
let mouseX = 0
let mouseY = 0
let cursorX = 0
let cursorY = 0
const speed = 0.2 // Higher value = faster tracking to mouse position

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
