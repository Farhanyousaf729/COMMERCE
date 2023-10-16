import mongoose from 'mongoose';
const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
)
const ProductsSchema = mongoose.Schema({

  name: { type: String, required: true },
  catgorey: { type: String, required: true },
  brand: { type: String, required: true },
  pic: { type: String, required: true },
  price: { type: Number, required: true },
  dis: { type: String, required: true },
  rating: { type: Number, required: true },
  numReviews: { type: Number, required: true },
  countInStock: { type: Number, required: true },
  reviews: [reviewSchema]

},
  { timestamps: true }
)
const ProductModel = mongoose.model('Product', ProductsSchema)
export default ProductModel