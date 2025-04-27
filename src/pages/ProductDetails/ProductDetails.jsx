import { useParams } from "react-router-dom";
import useProducts from "../../hooks/useProducts";
import { useEffect, useState } from "react";

const ProductDetails = () => {
    const [products] = useProducts();
    const [product, setProduct] = useState({});
    const { unique_id, name, short_desc, image, stock, price, buying_price, discount_amount, discount_date, updated_at, category } = product;

    const { id } = useParams();
    // console.log('Product id:', id);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await products.find(prd => prd?.unique_id === id);
                if (res) {
                    setProduct(res || {});
                }
            } catch (err) {
                console.error(err);
                return {};
            }
        }
        fetchProduct();
    }, [products, id]);

    console.log(product)

    return (
        <section className="product-deatails">
            <div className="product-details-inner container mx-auto px-6 lg:px-40 py-14">
                <img src={`https://admin.refabry.com/storage/product/${image}`} alt="Product Image" className="w-full h-[150px] sm:h-[225px] md:h-[300px] lg:h-[500px] rounded-lg" />

                <div className="mt-5">
                    <p className="text-xs bg-green-50 inline-block border border-green-300 rounded-full px-3 py-[2px]">{category?.name}</p>
                    <div className="flex items-center justify-between my-1.5">
                        <h1 className="text-lg md:text-xl text-slate-700 font-medium">{name}</h1>
                        <div className="flex items-center">
                            <p className="text-lg md:text-xl font-medium text-orange-600 me-2">$<span>{price}</span></p>
                            <h1 className="text-xs px-2 rounded-sm bg-orange-100 text-orange-700">
                                -<span className="ps-[2px]">$</span>
                                <span>{discount_amount ? discount_amount : 0}</span>
                            </h1>
                        </div>
                    </div>

                    <div className="my-3">
                        <h1 className="text-green-700 font-medium">In stock: ({stock ? stock : 0})</h1>
                        <p className="text-sm text-gray-500">Last update: {updated_at ? updated_at.split('T')[0] : 'Not available'}</p>
                    </div>

                    <div>
                        <p>{short_desc}</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductDetails;