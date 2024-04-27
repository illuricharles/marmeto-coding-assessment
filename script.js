// calculate percentage
function calculatePercentageDiscount(currentPrice, originalPrice) {
    originalPrice = originalPrice.replace('$', "")
    currentPrice = currentPrice.replace("$", "")
    let discount = originalPrice - currentPrice;
    let percentageDiscount = (discount / originalPrice) * 100;
    return parseInt(percentageDiscount)
}

// Fetch user details
async function fetchDetails() {
    const response = await fetch('https://cdn.shopify.com/s/files/1/0564/3685/0790/files/singleProduct.json?v=1701948448')
    const data = await response.json()
    
    const details = data.product 
    

    const {title, vendor, price, options, description, images} = details
    const comparePrice = details.compare_at_price
    const discount = calculatePercentageDiscount(price, comparePrice)
    
    const colorValues = options[0].values
    const sizeValues = options[1].values
    console.log(sizeValues)

    const productImageContainerEl = document.getElementById('productImageContainer')

    const productMainImage = document.createElement('img')
    productMainImage.classList.add('product-main-image')
    productMainImage.src = images[0].src
    productMainImage.alt = "Product Image"
    console.log(images[0].src)
    productImageContainerEl.appendChild(productMainImage)

    const thumbnailContainerEl = document.createElement('div')
    thumbnailContainerEl.classList.add('product-thumbnail-container')

    // Thumbnail 
    images.forEach(eachThumbnail => {
        for(let thumbnail in eachThumbnail) {
            const thumbnailImgEl = document.createElement('img')
            thumbnailImgEl.alt = "Thumbnail"
            thumbnailImgEl.src = eachThumbnail[thumbnail]
            thumbnailImgEl.classList.add('thumbnail')
            thumbnailContainerEl.appendChild(thumbnailImgEl)
        }
    })

    productImageContainerEl.appendChild(thumbnailContainerEl)
    
    
    const vendorEl = document.getElementById('vendor')
    vendorEl.textContent = vendor

    const titleEl = document.getElementById('title')
    titleEl.textContent = title

    const priceEl = document.getElementById('price')
    priceEl.textContent = price

    const comparePriceEl = document.getElementById('comparePrice')
    comparePriceEl.textContent = comparePrice

    const discountPercentageEl = document.getElementById('discountPercentage')
    discountPercentageEl.textContent = `${discount}% Off`

    const colorEl = document.getElementById('color')
    const sizeDetailsEl = document.getElementById('sizeDetails')
    

    // Color Selector
    colorValues.forEach(colorDetails => {
        for(let eachColorValue in colorDetails) {
            const colorPickerContainerEl = document.createElement('div')
            colorPickerContainerEl.classList.add('color-picker-container')
            colorPickerContainerEl.style.backgroundColor = colorDetails[eachColorValue]
            colorPickerContainerEl.id = eachColorValue
            colorPickerContainerEl.addEventListener('click', function() {
                const colorPickerContainerEl = document.getElementsByClassName('color-picker-container')
                for(let i=0;i<colorPickerContainerEl.length;i++){
                    if(colorPickerContainerEl[i].id === eachColorValue){
                        colorPickerContainerEl[i].style.border = `1px solid ${eachColorValue}`
                    }
                    else {
                        colorPickerContainerEl[i].style.border = ``
                    }
                }

            })
            colorEl.appendChild(colorPickerContainerEl)
        }
    })

    let checked = false

    // Size Selector
    sizeValues.forEach(eachSizeValue => {
        console.log(eachSizeValue)
        const sizeTypeContainer = document.createElement('div')
        sizeTypeContainer.classList.add('size-type-container')

        const sizeTypeInputEl = document.createElement('input')
        sizeTypeInputEl.type = 'radio'
        sizeTypeInputEl.id = eachSizeValue
        sizeTypeInputEl.value = eachSizeValue
        sizeTypeInputEl.name = options[1].name
        if (checked === false) {
            sizeTypeInputEl.checked = true 
            checked = true
        }

        const sizeTypeLabelEl = document.createElement('label')
        sizeTypeLabelEl.htmlFor = eachSizeValue
        sizeTypeLabelEl.textContent = eachSizeValue



        sizeTypeContainer.appendChild(sizeTypeInputEl)
        sizeTypeContainer.appendChild(sizeTypeLabelEl)
        sizeDetailsEl.appendChild(sizeTypeContainer)

    })

    const addItemsEl = document.getElementById('addItems')
    const cartItemAddedEl = document.getElementById('cartItemAdded')

    addItemsEl.addEventListener('click', function() {
        cartItemAddedEl.classList.remove('display-none')

    })

    // Description
    const descriptionContainerEl = document.getElementById('descriptionContainer')
    descriptionContainerEl.innerHTML = description
    console.log(description)
    descriptionContainerEl.classList.add('description')


}

fetchDetails()

// Product Quantity
const productCountEl = document.getElementById('productCount')
const decreaseBtnEl = document.getElementById('decreaseBtn')
const increaseBtnEl = document.getElementById('increaseBtn')

decreaseBtnEl.addEventListener('click', function() {
    let currentCount = parseInt(productCountEl.textContent)
    currentCount = currentCount - 1
    if(currentCount >= 0){
        productCountEl.textContent = currentCount
    }
})

increaseBtnEl.addEventListener('click', function() {
    let currentCount = parseInt(productCountEl.textContent)
    currentCount = currentCount + 1 
    productCountEl.textContent = currentCount
})

