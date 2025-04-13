import React, { useReducer, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import TshirtSvg from '/src/assets/tshirt.svg';
import JerseySvg from '/src/assets/jersey.svg';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

// Fabric imports (assumed fixed)
import jacquard1 from '/src/assets/Fabrics/jacquard/image1.jpg';
import jacquard2 from '/src/assets/Fabrics/jacquard/image2.jpg';
import jacquard3 from '/src/assets/Fabrics/jacquard/image3.jpg';
import premiumJacquard1 from '/src/assets/Fabrics/premium-Jacquard/image1.jpg';
import premiumJacquard2 from '/src/assets/Fabrics/premium-Jacquard/image2.jpg';
import premiumJacquard3 from '/src/assets/Fabrics/premium-Jacquard/image3.jpg';
import boxMesh1 from '/src/assets/Fabrics/box-mesh/image1.jpg';
import boxMesh2 from '/src/assets/Fabrics/box-mesh/image2.jpg';
import boxMesh3 from '/src/assets/Fabrics/box-mesh/image3.jpg';
import chinigura1 from '/src/assets/Fabrics/chinigura/image1.jpg';
import chinigura2 from '/src/assets/Fabrics/chinigura/image2.jpg';
import chinigura3 from '/src/assets/Fabrics/chinigura/image3.jpg';
import honeycomb1 from '/src/assets/Fabrics/honeycomb/image1.jpg';
import honeycomb2 from '/src/assets/Fabrics/honeycomb/image2.jpg';
import honeycomb3 from '/src/assets/Fabrics/honeycomb/image3.jpg';
import pp1 from '/src/assets/Fabrics/pp/image1.jpg';
import pp2 from '/src/assets/Fabrics/pp/image2.jpg';
import pp3 from '/src/assets/Fabrics/pp/image3.jpg';

const initialOrder = {
  category: null,
  subcategory: null,
  type: null,
  color: null,
  quantity: 10,
  text: '',
  design: null,
  colorsUsed: 0,
};

const orderReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CATEGORY':
      return { ...initialOrder, category: action.payload };
    case 'SET_SUBCATEGORY':
      return { ...state, subcategory: action.payload, type: null, color: null };
    case 'SET_TYPE':
      return { ...state, type: action.payload.type, color: action.payload.color || null };
    case 'SET_COLOR':
      return { ...state, color: action.payload };
    case 'SET_QUANTITY':
      return { ...state, quantity: action.payload };
    case 'SET_TEXT':
      return { ...state, text: action.payload };
    case 'SET_DESIGN':
      return { ...state, design: action.payload };
    case 'SET_COLORS_USED':
      return { ...state, colorsUsed: action.payload };
    case 'RESET':
      return initialOrder;
    default:
      return state;
  }
};

const tshirtOptions = {
  'Angshuk A+': [
    {
      name: 'Black Premium Shirt',
      color: 'Black',
      image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=800&auto=format&fit=crop',
      pricing: [
        { range: [1000, Infinity], price: 277 },
        { range: [800, 1000], price: 170 },
        { range: [600, 800], price: 175 },
        { range: [500, 600], price: 180 },
        { range: [300, 400], price: 182 },
        { range: [200, 300], price: 185 },
        { range: [150, 200], price: 187 },
        { range: [100, 150], price: 190 },
        { range: [50, 99], price: 195 },
        { range: [30, 49], price: 200 },
        { range: [20, 30], price: 222 },
        { range: [10, 20], price: 244 },
      ],
      desc: 'Premium black T-shirt, sleek and stylish',
    },
    // ... (other T-shirts unchanged, omitted for brevity)
  ],
  'Angshuk A': [
    {
      name: 'Black Shirt',
      color: 'Black',
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800&auto=format&fit=crop',
      pricing: [
        { range: [1000, Infinity], price: 200 },
        { range: [800, 1000], price: 202 },
        { range: [600, 800], price: 204 },
        { range: [500, 600], price: 206 },
        { range: [300, 400], price: 208 },
        { range: [200, 300], price: 210 },
        { range: [150, 200], price: 212 },
        { range: [100, 150], price: 214 },
        { range: [50, 99], price: 216 },
        { range: [30, 49], price: 218 },
        { range: [20, 30], price: 220 },
        { range: [10, 20], price: 222 },
      ],
      desc: 'Classic black T-shirt, versatile and stylish',
    },
    // ... (other T-shirts unchanged)
  ],
};

const jerseyFabrics = [
  {
    name: 'Jacquard',
    price: 350,
    desc: 'Intricate weave, premium feel',
    image: jacquard1,
    galleryImages: [
      { src: jacquard1, alt: 'Jacquard Jersey Front', caption: 'Team jersey front view' },
      { src: jacquard2, alt: 'Jacquard Jersey Side', caption: 'Side profile in action' },
      { src: jacquard3, alt: 'Jacquard Detail', caption: 'Close-up of weave' },
    ],
  },
  {
    name: 'Premium Jacquard',
    price: 400,
    desc: 'Luxury fabric, top-tier',
    image: premiumJacquard1,
    galleryImages: [
      { src: premiumJacquard1, alt: 'Premium Jacquard Jersey', caption: 'Elite team kit' },
      { src: premiumJacquard2, alt: 'Premium Jacquard Back', caption: 'Back design' },
      { src: premiumJacquard3, alt: 'Premium Jacquard Texture', caption: 'Luxury texture' },
    ],
  },
  {
    name: 'Box Mesh',
    price: 300,
    desc: 'Breathable, sporty design',
    image: boxMesh1,
    galleryImages: [
      { src: boxMesh1, alt: 'Box Mesh Jersey', caption: 'Breathable jersey in game' },
      { src: boxMesh2, alt: 'Box Mesh Side', caption: 'Side view during play' },
      { src: boxMesh3, alt: 'Box Mesh Pattern', caption: 'Mesh pattern close-up' },
    ],
  },
  {
    name: 'Chinigura',
    price: 320,
    desc: 'Unique texture, stylish',
    image: chinigura1,
    galleryImages: [
      { src: chinigura1, alt: 'Chinigura Jersey', caption: 'Stylish team jersey' },
      { src: chinigura2, alt: 'Chinigura Front', caption: 'Front design detail' },
      { src: chinigura3, alt: 'Chinigura Texture', caption: 'Unique texture shot' },
    ],
  },
  {
    name: 'Honeycomb',
    price: 310,
    desc: 'Lightweight, modern look',
    image: honeycomb1,
    galleryImages: [
      { src: honeycomb1, alt: 'Honeycomb Jersey', caption: 'Dynamic team kit' },
      { src: honeycomb2, alt: 'Honeycomb Side', caption: 'Side view in motion' },
      { src: honeycomb3, alt: 'Honeycomb Pattern', caption: 'Honeycomb pattern' },
    ],
  },
  {
    name: 'PP',
    price: 290,
    desc: 'Cost-effective, durable',
    image: pp1,
    galleryImages: [
      { src: pp1, alt: 'PP Jersey', caption: 'Durable team jersey' },
      { src: pp2, alt: 'PP Front', caption: 'Front view of design' },
      { src: pp3, alt: 'PP Fabric', caption: 'Fabric durability shot' },
    ],
  },
];

function Order() {
  const [order, dispatch] = useReducer(orderReducer, initialOrder);
  const [step, setStep] = useState(1);
  const [showPreConfirm, setShowPreConfirm] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isBackClicked, setIsBackClicked] = useState(false);
  const [selectedFabricImages, setSelectedFabricImages] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const { control, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: {
      quantity: 10,
      text: '',
      colorsUsed: 0,
      design: null,
    },
  });

  const calculatePrice = useMemo(() => {
    return () => {
      let basePrice = 0;

      if (order.category === 'T-shirt') {
        const tshirtList = tshirtOptions[order.subcategory] || [];
        const selectedTshirt = tshirtList.find((t) => t.name === order.type);
        if (selectedTshirt) {
          const pricingTier = selectedTshirt.pricing.find(
            (tier) => order.quantity >= tier.range[0] && order.quantity <= tier.range[1]
          );
          basePrice = pricingTier ? pricingTier.price : selectedTshirt.pricing[0].price;
        }
      } else if (order.category === 'Jersey') {
        if (order.type === 'Jacquard') basePrice = 350;
        else if (order.type === 'Premium Jacquard') basePrice = 400;
        else if (order.type === 'Box Mesh') basePrice = 300;
        else if (order.type === 'Chinigura') basePrice = 320;
        else if (order.type === 'Honeycomb') basePrice = 310;
        else if (order.type === 'PP') basePrice = 290;
      }

      let total = basePrice * order.quantity;
      if (order.text) total += 20 * order.quantity;
      if (order.design) total += 50 * order.quantity;
      if (order.colorsUsed > 0) total += (order.colorsUsed * 10) * order.quantity;
      const setupFee = order.quantity < 100 ? 500 : 0;
      total += setupFee;

      let discountRate = 0;
      if (order.quantity >= 500) discountRate = 0.2;
      else if (order.quantity >= 200) discountRate = 0.15;
      else if (order.quantity >= 100) discountRate = 0.1;
      else if (order.quantity >= 50) discountRate = 0.05;

      const discount = total * discountRate;
      total -= discount;

      return {
        base: (basePrice * order.quantity).toFixed(2),
        text: order.text ? (20 * order.quantity).toFixed(2) : '0.00',
        design: order.design ? (50 * order.quantity).toFixed(2) : '0.00',
        colors: order.colorsUsed > 0 ? ((order.colorsUsed * 10) * order.quantity).toFixed(2) : '0.00',
        setupFee: setupFee.toFixed(2),
        discount: discount.toFixed(2),
        total: total.toFixed(2),
      };
    };
  }, [order]);

  const getCurrentPricePerUnit = () => {
    if (order.category !== 'T-shirt' || !order.subcategory || !order.type) return 0;
    const tshirtList = tshirtOptions[order.subcategory] || [];
    const selectedTshirt = tshirtList.find((t) => t.name === order.type);
    if (!selectedTshirt) return 0;

    const pricingTier = selectedTshirt.pricing.find(
      (tier) => order.quantity >= tier.range[0] && order.quantity <= tier.range[1]
    );
    return pricingTier ? pricingTier.price : selectedTshirt.pricing[0].price;
  };

  const handleCategorySelect = (category) => {
    dispatch({ type: 'SET_CATEGORY', payload: category });
    setStep(category === 'T-shirt' ? 2 : 3);
  };

  const handleSubcategorySelect = (subcategory) => {
    dispatch({ type: 'SET_SUBCATEGORY', payload: subcategory });
    setStep(3);
  };

  const handleTypeSelect = (typeObj) => {
    dispatch({ type: 'SET_TYPE', payload: typeObj });
    setStep(4);
  };

  const handleColorSelect = (color) => {
    dispatch({ type: 'SET_COLOR', payload: color });
    setStep(5);
  };

  const handleImageClick = () => {
    if (order.category === 'Jersey' && order.type) {
      const fabric = jerseyFabrics.find((f) => f.name === order.type);
      if (fabric && fabric.galleryImages) {
        setSelectedFabricImages(fabric.galleryImages);
        setCurrentImageIndex(0);
      }
    }
  };

  const handleCloseModal = () => {
    setSelectedFabricImages(null);
    setCurrentImageIndex(0);
  };

  const handleNextImage = () => {
    if (currentImageIndex < selectedFabricImages.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const handlePrevImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  const prevStep = () => {
    if (isBackClicked || step === 1) return;
    setIsBackClicked(true);
    setTimeout(() => setIsBackClicked(false), 300);

    if (step === 2) {
      dispatch({ type: 'SET_CATEGORY', payload: null });
      setStep(1);
    } else if (step === 3) {
      if (order.category === 'T-shirt') {
        dispatch({ type: 'SET_SUBCATEGORY', payload: null });
        dispatch({ type: 'SET_TYPE', payload: { type: null, color: null } });
        setStep(2);
      } else {
        dispatch({ type: 'RESET' });
        setStep(1);
      }
    } else if (step === 4) {
      if (order.category === 'T-shirt') {
        dispatch({ type: 'SET_TYPE', payload: { type: null, color: null } });
        setStep(3);
      } else {
        dispatch({ type: 'SET_COLOR', payload: null });
        setStep(3);
      }
    } else if (step === 5) {
      if (order.category === 'Jersey') {
        setStep(4);
      } else {
        setStep(4);
      }
    } else if (step === 6) {
      dispatch({ type: 'SET_TEXT', payload: '' });
      dispatch({ type: 'SET_DESIGN', payload: null });
      dispatch({ type: 'SET_COLORS_USED', payload: 0 });
      setStep(5);
    }
  };

  const handlePreConfirm = () => {
    setShowPreConfirm(true);
  };

  const onSubmit = async () => {
    setIsSubmitting(true);
    try {
      await axios.post('https://jsonplaceholder.typicode.com/posts', order);
      setShowPreConfirm(false);
      setShowConfirmation(true);
    } catch (error) {
      alert('Error submitting order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const price = calculatePrice();
  const currentPricePerUnit = getCurrentPricePerUnit();

  return (
    <div className="min-h-screen bg-off-white pt-20 pb-10">
      <Helmet>
        <title>Angshuk - Order Custom Apparel</title>
        <meta
          name="description"
          content="Create your custom T-shirts and jerseys with Angshuk's easy ordering process."
        />
      </Helmet>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-deep-charcoal text-center mb-8">
          Custom Order
        </h1>
        <div className="flex justify-center mb-8 flex-wrap gap-2">
          {[
            'Category',
            'Subcategory',
            'Type',
            ...(order.category === 'Jersey' ? ['Color'] : []),
            'Quantity',
            'Customization',
          ].map((label, index) => (
            <div key={index} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                  step > index + 1
                    ? 'bg-soft-teal text-off-white'
                    : step === index + 1
                    ? 'bg-soft-teal text-off-white'
                    : 'bg-light-gray text-gray-600'
                }`}
              >
                {index + 1}
              </div>
              <span
                className={`ml-2 text-sm ${
                  step >= index + 1 ? 'text-deep-charcoal' : 'text-gray-600'
                }`}
              >
                {label}
              </span>
              {index <
                (order.category === 'Jersey' ? 5 : 4) && (
                <div
                  className={`w-12 h-1 mx-2 ${
                    step > index + 1 ? 'bg-soft-teal' : 'bg-light-gray'
                  }`}
                ></div>
              )}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div
            className="lg:col-span-2 bg-white p-6 rounded-lg shadow"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div
                      onClick={() => handleCategorySelect('T-shirt')}
                      className="bg-off-white p-6 rounded-lg shadow hover:shadow-lg cursor-pointer transition-transform hover:scale-105"
                    >
                      <h3 className="text-xl font-semibold text-deep-charcoal">T-shirt</h3>
                      <p className="text-gray-600 mt-2">
                        Classic and versatile, perfect for any occasion.
                      </p>
                      <img src={TshirtSvg} alt="T-shirt" className="mt-4 h-32 mx-auto" />
                    </div>
                    <div
                      onClick={() => handleCategorySelect('Jersey')}
                      className="bg-off-white p-6 rounded-lg shadow hover:shadow-lg cursor-pointer transition-transform hover:scale-105"
                    >
                      <h3 className="text-xl font-semibold text-deep-charcoal">Jersey</h3>
                      <p className="text-gray-600 mt-2">
                        Sporty and durable, ideal for teams and events.
                      </p>
                      <img src={JerseySvg} alt="Jersey" className="mt-4 h-32 mx-auto" />
                    </div>
                  </div>
                </motion.div>
              )}
              {step === 2 && order.category === 'T-shirt' && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <h3 className="text-xl font-semibold text-deep-charcoal mb-4">
                    Choose T-shirt Subcategory
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div
                      onClick={() => handleSubcategorySelect('Angshuk A+')}
                      className="bg-off-white p-6 rounded-lg shadow hover:shadow-lg cursor-pointer transition-transform hover:scale-105"
                    >
                      <h4 className="text-lg font-semibold text-deep-charcoal">Angshuk A+</h4>
                      <p className="text-gray-600 mt-2">
                        Premium T-shirts with top-tier style and comfort.
                      </p>
                    </div>
                    <div
                      onClick={() => handleSubcategorySelect('Angshuk A')}
                      className="bg-off-white p-6 rounded-lg shadow hover:shadow-lg cursor-pointer transition-transform hover:scale-105"
                    >
                      <h4 className="text-lg font-semibold text-deep-charcoal">Angshuk A</h4>
                      <p className="text-gray-600 mt-2">
                        Affordable T-shirts for everyday use.
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={prevStep}
                    disabled={step === 1}
                    className={`mt-4 text-soft-teal hover:underline ${
                      step === 1 ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    Back
                  </button>
                </motion.div>
              )}
              {step === 3 && order.category === 'T-shirt' && order.subcategory === 'Angshuk A+' && (
                <motion.div
                  key="step3-a-plus"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <h3 className="text-xl font-semibold text-deep-charcoal mb-4">
                    Choose Your Premium T-shirt
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {tshirtOptions['Angshuk A+'].map((tshirt) => (
                      <div
                        key={tshirt.name}
                        onClick={() => handleTypeSelect({ type: tshirt.name, color: tshirt.color })}
                        className="bg-off-white p-4 rounded-lg shadow hover:shadow-lg cursor-pointer transition-transform hover:scale-105"
                      >
                        <LazyLoadImage
                          src={tshirt.image}
                          alt={tshirt.name}
                          effect="blur"
                          className="w-full h-48 object-cover rounded-lg mb-4"
                        />
                        <p className="font-medium text-deep-charcoal text-center">{tshirt.name}</p>
                        <p className="text-sm text-gray-600 text-center">
                          ৳{tshirt.pricing[tshirt.pricing.length - 1].price} - ৳{tshirt.pricing[0].price}
                        </p>
                        <p className="text-sm text-gray-600 text-center">{tshirt.desc}</p>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={prevStep}
                    className="mt-4 text-soft-teal hover:underline"
                  >
                    Back
                  </button>
                </motion.div>
              )}
              {step === 3 && order.category === 'T-shirt' && order.subcategory === 'Angshuk A' && (
                <motion.div
                  key="step3-a"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <h3 className="text-xl font-semibold text-deep-charcoal mb-4">
                    Choose Your T-shirt
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {tshirtOptions['Angshuk A'].map((tshirt) => (
                      <div
                        key={tshirt.name}
                        onClick={() => handleTypeSelect({ type: tshirt.name, color: tshirt.color })}
                        className="bg-off-white p-4 rounded-lg shadow hover:shadow-lg cursor-pointer transition-transform hover:scale-105"
                      >
                        <LazyLoadImage
                          src={tshirt.image}
                          alt={tshirt.name}
                          effect="blur"
                          className="w-full h-48 object-cover rounded-lg mb-4"
                        />
                        <p className="font-medium text-deep-charcoal text-center">{tshirt.name}</p>
                        <p className="text-sm text-gray-600 text-center">
                          ৳{tshirt.pricing[tshirt.pricing.length - 1].price} - ৳{tshirt.pricing[0].price}
                        </p>
                        <p className="text-sm text-gray-600 text-center">{tshirt.desc}</p>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={prevStep}
                    className="mt-4 text-soft-teal hover:underline"
                  >
                    Back
                  </button>
                </motion.div>
              )}
              {step === 3 && order.category === 'Jersey' && (
                <motion.div
                  key="step3-jersey"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <h3 className="text-xl font-semibold text-deep-charcoal mb-4">
                    Choose Fabric Type
                  </h3>
                  <div className="mb-4 text-center">
                    <Link
                      to="/fabrics"
                      className="text-soft-teal hover:underline text-base"
                    >
                      Learn More About Our Fabrics
                    </Link>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {jerseyFabrics.map((fabric) => (
                      <div
                        key={fabric.name}
                        onClick={() => handleTypeSelect({ type: fabric.name })}
                        className="flex items-start p-4 border rounded-lg cursor-pointer hover:bg-light-gray transition"
                      >
                        <input
                          type="radio"
                          name="jersey-fabric"
                          checked={order.type === fabric.name}
                          onChange={() => handleTypeSelect({ type: fabric.name })}
                          className="mt-1 mr-4"
                        />
                        <div>
                          <div className="w-12 h-12 rounded mb-2">
                            <LazyLoadImage
                              src={fabric.image}
                              alt={fabric.name}
                              effect="blur"
                              className="w-12 h-12 rounded object-cover"
                            />
                          </div>
                          <p className="font-medium text-deep-charcoal">{fabric.name}</p>
                          <p className="text-sm text-gray-600">৳{fabric.price} per unit</p>
                          <p className="text-sm text-gray-600">{fabric.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={prevStep}
                    className="mt-4 text-soft-teal hover:underline"
                  >
                    Back
                  </button>
                </motion.div>
              )}
              {step === 4 && order.category === 'Jersey' && (
                <motion.div
                  key="step4-jersey"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <h3 className="text-xl font-semibold text-deep-charcoal mb-4">
                    Choose Color
                  </h3>
                  <div className="grid grid-cols-4 gap-4">
                    {['Black', 'White', 'Blue', 'Red'].map((color) => (
                      <div
                        key={color}
                        onClick={() => handleColorSelect(color)}
                        className={`w-16 h-16 rounded-full cursor-pointer border-2 transition-transform hover:scale-110 ${
                          order.color === color ? 'border-soft-teal' : 'border-light-gray'
                        }`}
                        style={{ backgroundColor: color.toLowerCase() }}
                      ></div>
                    ))}
                  </div>
                  <button
                    onClick={prevStep}
                    className="mt-4 text-soft-teal hover:underline"
                  >
                    Back
                  </button>
                </motion.div>
              )}
              {step === (order.category === 'Jersey' ? 5 : 4) && (
                <motion.div
                  key="step-quantity"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <h3 className="text-xl font-semibold text-deep-charcoal mb-4">
                    Choose Quantity
                  </h3>
                  <Controller
                    name="quantity"
                    control={control}
                    rules={{ required: 'Quantity is required', min: 10, max: 1000 }}
                    render={({ field }) => (
                      <input
                        type="number"
                        {...field}
                        onChange={(e) => {
                          const value = parseInt(e.target.value) || 10;
                          field.onChange(value);
                          dispatch({ type: 'SET_QUANTITY', payload: value });
                        }}
                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-soft-teal"
                      />
                    )}
                  />
                  {errors.quantity && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.quantity.message || 'Quantity must be between 10 and 1000'}
                    </p>
                  )}
                  <p className="text-sm text-gray-600 mt-2">
                    Minimum order: 10 units. Max: 1000.
                    {order.category === 'T-shirt' && (
                      <> Current price per unit: ৳{currentPricePerUnit}</>
                    )}
                  </p>
                  <button
                    onClick={prevStep}
                    className="mt-4 text-soft-teal hover:underline mr-4"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setStep(order.category === 'Jersey' ? 6 : 5)}
                    className="mt-4 bg-soft-teal text-off-white px-4 py-2 rounded-lg hover:bg-teal-600 transition"
                  >
                    Next
                  </button>
                </motion.div>
              )}
              {step === (order.category === 'Jersey' ? 6 : 5) && (
                <motion.div
                  key="step-customization"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <form onSubmit={handleSubmit(handlePreConfirm)}>
                    <h3 className="text-xl font-semibold text-deep-charcoal mb-4">
                      Customization (Optional)
                    </h3>
                    <div className="mb-4">
                      <label className="block text-deep-charcoal mb-2">Text</label>
                      <Controller
                        name="text"
                        control={control}
                        rules={{ maxLength: 50 }}
                        render={({ field }) => (
                          <input
                            type="text"
                            {...field}
                            onChange={(e) => {
                              field.onChange(e.target.value);
                              dispatch({ type: 'SET_TEXT', payload: e.target.value });
                            }}
                            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-soft-teal"
                            placeholder="e.g., Team Name"
                          />
                        )}
                      />
                      {errors.text && (
                        <p className="text-red-500 text-sm mt-1">
                          Maximum 50 characters
                        </p>
                      )}
                      <p className="text-sm text-gray-600 mt-2">
                        Add text like team names or slogans (৳20 per unit).
                      </p>
                    </div>
                    <div className="mb-4">
                      <label className="block text-deep-charcoal mb-2">Design Upload</label>
                      <Controller
                        name="design"
                        control={control}
                        render={({ field }) => (
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files[0];
                              field.onChange(file);
                              dispatch({ type: 'SET_DESIGN', payload: file });
                            }}
                            className="w-full p-2 border rounded-lg"
                          />
                        )}
                      />
                      <p className="text-sm text-gray-600 mt-2">
                        Upload your logo or design (৳50 per unit).
                      </p>
                    </div>
                    <div className="mb-4">
                      <label className="block text-deep-charcoal mb-2">Colors Used in Design</label>
                      <Controller
                        name="colorsUsed"
                        control={control}
                        rules={{ min: 0, max: 5 }}
                        render={({ field }) => (
                          <input
                            type="number"
                            {...field}
                            onChange={(e) => {
                              const value = parseInt(e.target.value) || 0;
                              field.onChange(value);
                              dispatch({ type: 'SET_COLORS_USED', payload: value });
                            }}
                            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-soft-teal"
                          />
                        )}
                      />
                      {errors.colorsUsed && (
                        <p className="text-red-500 text-sm mt-1">
                          Maximum 5 colors
                        </p>
                      )}
                      <p className="text-sm text-gray-600 mt-2">
                        Number of colors in your design (৳10 per color per unit).
                      </p>
                    </div>
                    <div className="flex justify-between">
                      <button
                        type="button"
                        onClick={prevStep}
                        className="text-soft-teal hover:underline"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        className="bg-soft-teal text-off-white px-4 py-2 rounded-lg hover:bg-teal-600 transition"
                      >
                        Review Order
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
          <motion.div
            className="bg-white p-6 rounded-lg shadow"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-xl font-semibold text-deep-charcoal mb-4">Order Preview</h3>
            <div className="mb-4">
              {order.category === 'T-shirt' && order.subcategory && order.type ? (
                <LazyLoadImage
                  src={tshirtOptions[order.subcategory].find((t) => t.name === order.type)?.image}
                  alt={order.type}
                  effect="blur"
                  className="w-full h-48 object-cover rounded-lg"
                />
              ) : order.category === 'Jersey' && order.type ? (
                <div
                  onClick={handleImageClick}
                  className="cursor-pointer"
                >
                  <LazyLoadImage
                    src={jerseyFabrics.find((f) => f.name === order.type)?.image}
                    alt={order.type}
                    effect="blur"
                    className="w-full h-48 object-cover rounded-lg hover:opacity-90 transition"
                  />
                </div>
              ) : (
                <div className="w-full h-48 bg-light-gray rounded-lg flex items-center justify-center">
                  <p className="text-gray-600">Select an item to preview</p>
                </div>
              )}
            </div>
            <p className="text-sm text-gray-600">
              <span className="font-medium">Category:</span> {order.category || 'N/A'}
            </p>
            {order.category === 'T-shirt' && (
              <p className="text-sm text-gray-600">
                <span className="font-medium">Subcategory:</span> {order.subcategory || 'N/A'}
              </p>
            )}
            <p className="text-sm text-gray-600">
              <span className="font-medium">Type:</span> {order.type || 'N/A'}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-medium">Color:</span> {order.color || 'N/A'}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-medium">Quantity:</span> {order.quantity}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-medium">Text:</span> {order.text || 'None'}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-medium">Design:</span> {order.design ? 'Uploaded' : 'None'}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-medium">Colors Used:</span> {order.colorsUsed || 0}
            </p>
            <hr className="my-4" />
            <h4 className="text-lg font-semibold text-deep-charcoal mb-2">Price Breakdown</h4>
            <p className="text-sm text-gray-600">
              <span className="font-medium">Base Price:</span> ৳{price.base}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-medium">Text:</span> ৳{price.text}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-medium">Design:</span> ৳{price.design}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-medium">Colors:</span> ৳{price.colors}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-medium">Setup Fee:</span> ৳{price.setupFee}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-medium">Discount:</span> -৳{price.discount}
            </p>
            <p className="text-lg font-semibold text-deep-charcoal mt-2">
              Total: ৳{price.total}
            </p>
          </motion.div>
        </div>
      </div>
      {/* Image Modal */}
      <AnimatePresence>
        {selectedFabricImages && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseModal}
          >
            <motion.div
              className="bg-off-white p-6 rounded-lg shadow-lg relative max-w-[80vw] max-h-[80vh] overflow-visible"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={handleCloseModal}
                className="absolute top-2 right-2 text-deep-charcoal hover:text-soft-teal"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <div className="relative flex items-center justify-center">
                {/* Left Arrow */}
                <button
                  onClick={handlePrevImage}
                  disabled={currentImageIndex === 0}
                  className={`absolute left-[-40px] top-1/2 transform -translate-y-1/2 bg-deep-charcoal bg-opacity-50 text-off-white p-3 rounded-full hover:bg-opacity-75 transition ${
                    currentImageIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                {/* Image */}
                <TransformWrapper
                  initialScale={1}
                  minScale={1}
                  maxScale={4}
                  wheel={{ step: 0.2 }}
                  pinch={{ step: 0.05 }}
                  doubleClick={{ disabled: false }}
                  panning={{ velocityDisabled: false }}
                >
                  <TransformComponent>
                    <img
                      src={selectedFabricImages[currentImageIndex].src}
                      alt={selectedFabricImages[currentImageIndex].alt}
                      className="max-w-full max-h-[60vh] object-contain"
                    />
                  </TransformComponent>
                </TransformWrapper>
                {/* Right Arrow */}
                <button
                  onClick={handleNextImage}
                  disabled={currentImageIndex === selectedFabricImages.length - 1}
                  className={`absolute right-[-40px] top-1/2 transform -translate-y-1/2 bg-deep-charcoal bg-opacity-50 text-off-white p-3 rounded-full hover:bg-opacity-75 transition ${
                    currentImageIndex === selectedFabricImages.length - 1
                      ? 'opacity-50 cursor-not-allowed'
                      : ''
                  }`}
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
              {/* Caption */}
              <p className="text-center text-deep-charcoal mt-4 text-sm">
                {selectedFabricImages[currentImageIndex].caption}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Pre-Confirmation Modal */}
      <AnimatePresence>
        {showPreConfirm && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-off-white p-6 rounded-lg shadow-lg max-w-md w-full"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              <h3 className="text-xl font-semibold text-deep-charcoal mb-4">
                Confirm Your Order
              </h3>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Category:</span> {order.category}
              </p>
              {order.category === 'T-shirt' && (
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Subcategory:</span> {order.subcategory}
                </p>
              )}
              <p className="text-sm text-gray-600">
                <span className="font-medium">Type:</span> {order.type}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Color:</span> {order.color || 'N/A'}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Quantity:</span> {order.quantity}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Text:</span> {order.text || 'None'}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Design:</span> {order.design ? 'Uploaded' : 'None'}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Colors Used:</span> {order.colorsUsed || 0}
              </p>
              <p className="text-lg font-semibold text-deep-charcoal mt-4">
                Total: ৳{price.total}
              </p>
              <div className="flex justify-between mt-6">
                <button
                  onClick={() => setShowPreConfirm(false)}
                  className="text-soft-teal hover:underline"
                >
                  Cancel
                </button>
                <button
                  onClick={onSubmit}
                  disabled={isSubmitting}
                  className={`bg-soft-teal text-off-white px-4 py-2 rounded-lg hover:bg-teal-600 transition ${
                    isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? 'Submitting...' : 'Confirm Order'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Confirmation Modal */}
      <AnimatePresence>
        {showConfirmation && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-off-white p-6 rounded-lg shadow-lg max-w-md w-full"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              <h3 className="text-xl font-semibold text-deep-charcoal mb-4">
                Order Confirmed!
              </h3>
              <p className="text-gray-600 mb-4">
                Thank you for your order. We'll send you a confirmation soon.
              </p>
              <Link
                to="/"
                className="bg-soft-teal text-off-white px-4 py-2 rounded-lg hover:bg-teal-600 transition block text-center"
                onClick={() => {
                  dispatch({ type: 'RESET' });
                  setStep(1);
                  setShowConfirmation(false);
                  reset();
                }}
              >
                Back to Home
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Order;