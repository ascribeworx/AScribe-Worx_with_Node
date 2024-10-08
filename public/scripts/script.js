document.querySelectorAll(".accordion-header").forEach((button) => {
  button.addEventListener("click", () => {
    const accordionContent = button.nextElementSibling;

    button.classList.toggle("active");

    if (button.classList.contains("active")) {
      accordionContent.style.maxHeight = accordionContent.scrollHeight + "px";
    } else {
      accordionContent.style.maxHeight = 0;
    }

    // Close other open accordion items
    document.querySelectorAll(".accordion-header").forEach((otherButton) => {
      if (otherButton !== button) {
        otherButton.classList.remove("active");
        otherButton.nextElementSibling.style.maxHeight = 0;
      }
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const alertElement = document.querySelector(".alert");
  if (alertElement) {
    setTimeout(() => {
      alertElement.classList.add("fade");
      setTimeout(() => {
        alertElement.remove();
      }, 500); 
    }, 5000); 
  }
});
