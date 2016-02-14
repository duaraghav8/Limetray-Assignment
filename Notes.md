I understand that there was no need for cryptography, but since the bcrypt module in Node makes it as easy as 1 line of code, I thougt it best to include it. If anything, I believe it demonstrates my security sense.

No validations, I focused on ecommerce

Each product's gotta have the quanTITY, Image accompanies product description

products sorted according to price in increasing order (, i.e., cheapest first)

If you've already added an item to cart once, adding the item again doesn't cause any change in the cart. the command is simply ignored

If user tries to access /product without choosing category, redirect him. Same for category to categoryList

There is no persistence in Cart & Product Search, i.e., if you have proceeded to checkout and have the cart filled and you refresh page, poof it GONE!

NONE of the CSS code has been written by me.