const mainCarousel = document.querySelector(".main-carousel");
const thumbsCarousel = document.querySelector(".thumbs-carousel");

if (mainCarousel) {
  const swiperThumbs = new Swiper(thumbsCarousel, {
    spaceBetween: 30,
    slidesPerView: 4,
    freeMode: true,
    watchSlidesProgress: true,
  });

  /** carousel main picture options */

  let options = {
    effect: "fade",
  };

  if (window.innerWidth < 991) {
    Object.assign(options, {
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
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

buttonAdd.addEventListener("click", () => {
  const itemOption = {
    id: item.dataset.itemId,
    image: item.dataset.img,
    title: item.dataset.title,
    price: item.dataset.price,
    value: outputValue.value,
  };

  if (outputValue.value > 0) {
    let items = [];
    let itemsStorage = JSON.parse(window.localStorage.getItem("items"));
    console.log(itemsStorage);
    if (itemsStorage) {
      const findIndex = itemsStorage.findIndex((x) => x.id === itemOption.id);

      // console.log(findIndex);

      if (findIndex) {
        // console.log("1231");
      } else {
        items = [...itemsStorage, itemOption];
      }
    } else {
      items = [itemOption];
    }

    // console.log(JSON.parse(window.localStorage.getItem("items")));

    // items.push(JSON.parse(window.localStorage.getItem("items")));

    // console.log(items);

    // console.log(JSON.stringify(items));
    // if()
    // window.localStorage.setItem("items", JSON.stringify(items));
  }
});
