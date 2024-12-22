let productContainer = document.querySelector(".products .row");

let loader = document.querySelector(".loader");
function fetchProducts(page, limit) {
  let url = `https://fakestoreapi.in/api/products?page=${page}&limit=${limit}`;
  let xhr = new XMLHttpRequest();
  if (loader) {
    loader.classList.remove("d-none");
  }
  xhr.open("GET", url, true);
  xhr.onreadystatechange = function () {
    productContainer.innerHTML = "";
    if (xhr.readyState === 4) {
      if (loader) {
        loader.classList.add("d-none");
      }
      if (xhr.status === 200) {
        let products = JSON.parse(xhr.responseText).products;
        for (product of products) {
          productContainer.innerHTML += `<div class="col-lg-3 col-md-4">
            <div class="card product-card h-100" id='${product.id}'>
              <div class="product-image p-4">
               <img src='${product.image}' alt='' >
              </div>
              <div class="card-body">
                <h5 class="card-title">${product.title.substring(0, 50)}..</h5>
                <p class="price">$${product.price}</p>
 <button class="btn-add-to-cart">
              <i class="fas fa-shopping-cart"></i>
              Add to Cart
            </button>
              </div>
            </div>
          </div>`;
        }
      }
    }
  };

  xhr.send();
}
let maxPages = 3;
let pageIndex = 1;
if (productContainer) {
  fetchProducts(pageIndex, 20);
}
document.querySelectorAll(".page-link").forEach((link) => {
  link.addEventListener("click", (event) => {
    products.scrollIntoView({
      // behavior: "smooth",
    });
    event.preventDefault();
    let index = event.currentTarget.dataset.page;
    if (index === "next") {
      if (pageIndex < maxPages) {
        pageIndex += 1;
      }
    } else if (index === "prev") {
      pageIndex = Math.max(1, pageIndex - 1);
    } else {
      pageIndex = parseInt(index);
    }
    fetchProducts(pageIndex, 20);

    document.querySelectorAll(".page-link").forEach((el) => {
      el.parentElement.classList.remove("active");
    });
    document.querySelectorAll(".page-link").forEach((el) => {
      if (el.dataset.page === pageIndex.toString()) {
        el.parentElement.classList.add("active");
      }
    });
    if (index === "next" || index === "prev") {
      document
        .querySelector(`.page-link[data-page="${pageIndex}"]`)
        ?.parentElement.classList.add("active");
    }
  });
});

//login system===========================================================
document.addEventListener("DOMContentLoaded", function () {
  let form = document.querySelector("form.register");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.classList.add("was-validated");
        return;
      }
      let fullName = form.querySelector("#fullName").value;
      let email = form.querySelector("#email").value;
      let password = form.querySelector("#password").value;
      let userData = { fullName, email, password };
      localStorage.setItem("user", JSON.stringify(userData));
      Swal.fire({
        icon: "success",
        title: "Sign-up Successful!",
        text: "Your account has been created.",
      }).then(() => {
        form.reset();
        window.location.href = "login.html";
        form.classList.remove("was-validated");
      });
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  let form = document.querySelector(".login");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.classList.add("was-validated");
        return;
      }
      let email = document.querySelector("#email").value;
      let password = document.querySelector("#password").value;
      let storedUser = JSON.parse(localStorage.getItem("user"));
      if (
        storedUser &&
        storedUser.email === email &&
        storedUser.password === password
      ) {
        Swal.fire({
          icon: "success",
          title: "Login Successful!",
          text: "Redirecting to the dashboard...",
        }).then(() => {
          window.location.href = "index.html";
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: "Invalid email or password. Please try again.",
        });
      }
    });
  }
});
