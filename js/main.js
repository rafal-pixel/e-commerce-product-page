const mainCarousel = document.querySelector(".main-carousel");
const thumbsCarousel = document.querySelector(".thumbs-carousel");

if (mainCarousel) {
  let swiperThumbs;
  if (window.innerWidth > 991) {
    swiperThumbs = new Swiper(thumbsCarousel, {
      spaceBetween: 30,
      slidesPerView: 4,
      freeMode: true,
      watchSlidesProgress: true,
    });
  }

  /** carousel main picture options */

  let options = {
    effect: "fade",
  };

  if (window.innerWidth < 991) {
    const prev = mainCarousel.querySelector(".swiper-button-prev");
    const next = mainCarousel.querySelector(".swiper-button-next");
    Object.assign(options, {
      loop: true,
      navigation: {
        nextEl: next,
        prevEl: prev,
      },
    });
  }

  if (swiperThumbs) {
    Object.assign(options, {
      thumbs: {
        swiper: swiperThumbs,
      },
    });
  }

  const swiperMain = new Swiper(".main-carousel", options);
}

const item = document.querySelector("[data-item-id]");
const btnMinus = document.querySelector(".add-to-cart-quantity__minus");
const btnPlus = document.querySelector(".add-to-cart-quantity__plus");
const outputValue = document.querySelector(".add-to-cart-quantity__value");
const buttonAdd = document.querySelector(".add-to-cart-button");
const min = outputValue.min ?? 1;
const max = outputValue.max ?? 99;

btnMinus.addEventListener("click", () => {
  if (outputValue.value > 0) {
    outputValue.value--;
  }
});

btnPlus.addEventListener("click", () => {
  if (outputValue.value < 99) {
    outputValue.value++;
  }
});

const addItemToBasket = (item) => {
  let itemsStorage = JSON.parse(window.localStorage.getItem("items"));
  if (itemsStorage) {
    const findIndex = itemsStorage.findIndex(
      (x) => parseInt(x.id) == parseInt(item.id)
    );
    if (findIndex === -1) {
      itemsStorage = [...itemsStorage, item];
    } else {
      itemsStorage[findIndex].value =
        parseInt(itemsStorage[findIndex].value) + item.value;
    }
  } else {
    itemsStorage = [item];
  }
  window.localStorage.setItem("items", JSON.stringify(itemsStorage));
  shoppingItemsLoad();
};

buttonAdd.addEventListener("click", () => {
  const itemOption = {
    id: parseInt(item.dataset.itemId),
    image: item.dataset.img,
    title: item.dataset.title,
    price: item.dataset.price,
    value: parseInt(outputValue.value),
  };

  if (outputValue.value > 0) {
    addItemToBasket(itemOption);
  }
});

const basketIcon = document.querySelector(".basket-shopping");
const basket = document.querySelector(".shopping-items");
const basketItems = document.querySelector(".shopping-items__items");
const basketItemsEmpty = document.querySelector(".shopping-items__empty");
const basketItem = document.querySelector(".items-basket");
const basketCount = document.querySelector(".basket-count-product");

const removeItem = (id) => {
  let itemsStorage = JSON.parse(window.localStorage.getItem("items"));
  if (itemsStorage) {
    itemsStorage = itemsStorage.filter((el) => {
      return parseInt(el.id) !== parseInt(id);
    });
  }
  window.localStorage.setItem("items", JSON.stringify(itemsStorage));
  shoppingItemsLoad();
};

const removeItems = () => {
  let itemRemove = document.querySelectorAll(".remove-item");
  if (itemRemove) {
    itemRemove.forEach((el) => {
      el.addEventListener("click", () => {
        removeItem(el.dataset.removeBasketId);
      });
    });
  }
};

const shoppingItemsLoad = () => {
  let itemsStorage = JSON.parse(window.localStorage.getItem("items"));
  if (itemsStorage && itemsStorage.length) {
    let count = 0;
    basketItem.innerHTML = "";
    basketCount.innerHTML = "";
    basketItemsEmpty.classList.remove("active");
    basketItems.classList.add("active");
    itemsStorage.map((el) => {
      basketItem.innerHTML += `
      <div class="item-basket">
        <div class="item-basket__img">
          <img src="${el.image}" alt="" width="50" height="50">
        </div>
        <div class="item-basket__content">
          <h4>${el.title}</h4>
          <div>${el.price} x ${el.value} <span>${parseFloat(
        el.price * el.value
      ).toFixed(2)}</span></div>
        </div> 
        <button class="remove-item" data-remove-basket-id="${el.id}">
          <img src="images/icon-delete.svg" alt="">
        </button>
      </div>
      `;
      count += parseInt(el.value);
    });
    basketCount.innerHTML = count;
    basketCount.style.display = "block";
  } else {
    basketItems.classList.remove("active");
    basketItemsEmpty.classList.add("active");
    basketCount.style.display = "none";
  }
  removeItems();
};

shoppingItemsLoad();

removeItems();

basketIcon.addEventListener("click", () => {
  if (basket.classList.contains("shopping-items--active")) {
    basket.classList.remove("shopping-items--active");
  } else {
    basket.classList.add("shopping-items--active");
  }
});

document.addEventListener("click", (e) => {
  let targetElement = e.target;
  do {
    if (
      (targetElement.classList &&
        targetElement.classList.contains("shopping-items")) ||
      (targetElement.classList &&
        targetElement.classList.contains("basket-shopping"))
    ) {
      return;
    } else targetElement = targetElement.parentNode;
  } while (targetElement);

  basket.classList.remove("shopping-items--active");
});

const html = document.querySelector("html");
const buttonMobile = document.querySelector(".header__menu-mobile");
const navbar = document.querySelector(".navbar");

if (buttonMobile) {
  buttonMobile.addEventListener("click", () => {
    if (buttonMobile.classList.contains("active")) {
      buttonMobile.classList.remove("active");
      navbar.classList.remove("active");
      html.classList.remove("overflow");
    } else {
      buttonMobile.classList.add("active");
      navbar.classList.add("active");
      html.classList.add("overflow");
    }
  });
}

const lightboxElement = (images) => {
  let slides = "";
  for (const image of images) {
    slides += `<div class="swiper-slide">
                <img src="${image.src}" class="img-cover" />
              </div>`;
  }
  return slides;
};

const customLightBox = (index, mainImg) => {
  const body = document.querySelector("body");
  const lightbox = document.createElement("div");
  lightbox.classList.add("lightbox-wrapper");
  const slides = lightboxElement(mainImg);
  lightbox.innerHTML = `
    <div class="lightbox-content">
      <button class="lightbox-close"></button>
      <div class="swiper lightbox-image">
        <div class="swiper-wrapper">
        ${slides}
        </div>
        <div class="lightbox-next"></div>
        <div class="lightbox-prev"></div>
      </div>
      <div class="swiper lightbox-thumbs">
        <div class="swiper-wrapper">
        ${slides}
        </div>
      </div>
    </div>`;

  document.body.appendChild(lightbox);

  const images = lightbox.querySelector(".lightbox-image");
  const thumbs = lightbox.querySelector(".lightbox-thumbs");
  const prev = images.querySelector(".lightbox-prev");
  const next = images.querySelector(".lightbox-next");

  if (images) {
    let swiperThumbs;
    swiperThumbs = new Swiper(thumbs, {
      spaceBetween: 30,
      slidesPerView: 4,
      freeMode: true,
      watchSlidesProgress: true,
      initialSlide: index,
    });

    let options = {
      effect: "fade",
      loop: true,
      initialSlide: index,
      navigation: {
        nextEl: next,
        prevEl: prev,
      },
    };

    if (thumbs) {
      Object.assign(options, {
        thumbs: {
          swiper: thumbs,
        },
      });
    }

    const swiperMain = new Swiper(images, options);
  }

  const closeLightbox = document.querySelector(".lightbox-close");
  if (closeLightbox) {
    closeLightbox.addEventListener("click", () => {
      document.querySelector(".lightbox-wrapper").remove();
    });
  }
};

const productImages = document.querySelector(".product-images");

const mainImg = document.querySelectorAll(".lightbox img");

if (productImages && window.innerWidth > 991) {
  mainImg.forEach((el, index) => {
    el.addEventListener("click", () => {
      customLightBox(index, mainImg);
    });
  });
}
