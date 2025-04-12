import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TshirtSvg from '/src/assets/tshirt.svg';
import JerseySvg from '/src/assets/jersey.svg';

function Order() {
  const [step, setStep] = useState(1);
  const [order, setOrder] = useState({
    category: null,
    subcategory: null,
    type: null,
    color: null,
    quantity: 10,
    text: '',
    design: null,
    colorsUsed: 0,
  });

  // T-shirt options with tiered pricing for Angshuk A+
  const tshirtOptions = {
    'Angshuk A+': [
      {
        name: 'JHK (Black)',
        pricing: [
          { range: [1000, Infinity], price: 199 },
          { range: [800, 1000], price: 100 },
          { range: [600, 800], price: 105 },
          { range: [500, 600], price: 110 },
          { range: [300, 400], price: 115 },
          { range: [200, 300], price: 120 },
          { range: [150, 200], price: 125 },
          { range: [100, 150], price: 130 },
          { range: [50, 99], price: 135 },
          { range: [30, 49], price: 145 },
          { range: [20, 30], price: 160 },
          { range: [10, 20], price: 170 },
        ],
        desc: 'Premium black JHK T-shirt, branded quality',
      },
      {
        name: 'JHK (Other Colours)',
        pricing: [
          { range: [1000, Infinity], price: 222 },
          { range: [800, 1000], price: 110 },
          { range: [600, 800], price: 115 },
          { range: [500, 600], price: 120 },
          { range: [300, 400], price: 125 },
          { range: [200, 300], price: 130 },
          { range: [150, 200], price: 135 },
          { range: [100, 150], price: 140 },
          { range: [50, 99], price: 145 },
          { range: [30, 49], price: 155 },
          { range: [20, 30], price: 170 },
          { range: [10, 20], price: 180 },
        ],
        desc: 'Vibrant JHK T-shirt in various colours, branded style',
      },
      {
        name: 'ID',
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
        desc: 'Premium ID branded T-shirt, top-tier comfort',
      },
    ],
    'Angshuk A': [
      { name: 'Basic Cotton', price: 200, desc: 'Simple and affordable cotton tee' },
      { name: 'Standard Fit', price: 220, desc: 'Comfortable fit for daily wear' },
      { name: 'Classic Tee', price: 210, desc: 'Timeless design, non-branded' },
    ],
  };

  // Price calculation
  const calculatePrice = () => {
    let basePrice = 0;

    if (order.category === 'T-shirt') {
      const tshirtList = tshirtOptions[order.subcategory] || [];
      const selectedTshirt = tshirtList.find((t) => t.name === order.type);
      if (selectedTshirt) {
        if (order.subcategory === 'Angshuk A+') {
          const pricingTier = selectedTshirt.pricing.find(
            (tier) => order.quantity >= tier.range[0] && order.quantity <= tier.range[1]
          );
          basePrice = pricingTier ? pricingTier.price : selectedTshirt.pricing[0].price;
        } else {
          basePrice = selectedTshirt.price;
        }
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

  const getCurrentPricePerUnit = () => {
    if (order.category !== 'T-shirt' || !order.subcategory || !order.type) return 0;
    const tshirtList = tshirtOptions[order.subcategory] || [];
    const selectedTshirt = tshirtList.find((t) => t.name === order.type);
    if (!selectedTshirt) return 0;

    if (order.subcategory === 'Angshuk A+') {
      const pricingTier = selectedTshirt.pricing.find(
        (tier) => order.quantity >= tier.range[0] && order.quantity <= tier.range[1]
      );
      return pricingTier ? pricingTier.price : selectedTshirt.pricing[0].price;
    } else {
      return selectedTshirt.price;
    }
  };

  const handleCategorySelect = (category) => {
    setOrder({ ...order, category, subcategory: null, type: null, color: null, text: '', design: null, colorsUsed: 0 });
    setStep(category === 'T-shirt' ? 2 : 3);
  };

  const handleSubcategorySelect = (subcategory) => {
    setOrder({ ...order, subcategory, type: null });
    setStep(3);
  };

  const handleTypeSelect = (type) => {
    setOrder({ ...order, type });
    setStep(4);
  };

  const handleColorSelect = (color) => {
    setOrder({ ...order, color });
    setStep(5);
  };

  const handleQuantityChange = (quantity) => {
    setOrder({ ...order, quantity: Math.max(10, Math.min(1000, quantity)) });
  };

  const handleTextChange = (text) => {
    setOrder({ ...order, text: text.slice(0, 50) });
  };

  const handleDesignChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setOrder({ ...order, design: url });
    }
  };

  const handleColorsUsedChange = (colors) => {
    setOrder({ ...order, colorsUsed: parseInt(colors) });
  };

  const prevStep = () => {
    console.log('prevStep called, current step:', step, 'category:', order.category);
    if (step === 2) {
      setOrder({ ...order, subcategory: null });
      setStep(1);
    } else if (step === 3) {
      if (order.category === 'T-shirt') {
        setOrder({ ...order, type: null });
        setStep(2);
      } else if (order.category === 'Jersey') {
        // Reset category when going back to Step 1 for Jerseys
        setOrder({
          ...order,
          category: null,
          type: null,
          color: null,
          quantity: 10,
          text: '',
          design: null,
          colorsUsed: 0,
        });
        setStep(1);
      }
    } else if (step === 4) {
      setOrder({ ...order, color: null });
      setStep(3);
    } else if (step === 5) {
      setOrder({ ...order, quantity: 10 });
      setStep(4);
    } else if (step === 6) {
      setOrder({ ...order, text: '', design: null, colorsUsed: 0 });
      setStep(5);
    }
    console.log('New step after prevStep:', step - 1, 'category:', order.category);
  };

  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleSubmit = () => {
    setShowConfirmation(true);
  };

  const price = calculatePrice();
  const currentPricePerUnit = getCurrentPricePerUnit();

  return (
    <div className="min-h-screen bg-off-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-deep-charcoal text-center mb-8">
          Custom Order
        </h1>
        {/* Progress Bar */}
        <div className="flex justify-center mb-8 flex-wrap gap-2">
          {['Category', 'Subcategory', 'Type', 'Color', 'Quantity', 'Customization'].map((label, index) => (
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
              {index < 5 && (
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
          {/* Form */}
          <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow transition-all duration-300">
            {step === 1 && (
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
            )}
            {step === 2 && order.category === 'T-shirt' && (
              <div>
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
                      Premium branded T-shirts from top brands.
                    </p>
                  </div>
                  <div
                    onClick={() => handleSubcategorySelect('Angshuk A')}
                    className="bg-off-white p-6 rounded-lg shadow hover:shadow-lg cursor-pointer transition-transform hover:scale-105"
                  >
                    <h4 className="text-lg font-semibold text-deep-charcoal">Angshuk A</h4>
                    <p className="text-gray-600 mt-2">
                      Affordable non-branded T-shirts for everyday use.
                    </p>
                  </div>
                </div>
                <button
                  onClick={prevStep}
                  className="mt-4 text-soft-teal hover:underline"
                >
                  Back
                </button>
              </div>
            )}
            {step === 3 && order.category === 'T-shirt' && (
              <div>
                <h3 className="text-xl font-semibold text-deep-charcoal mb-4">
                  Choose {order.subcategory} T-shirt
                </h3>
                {tshirtOptions[order.subcategory].map((tshirt) => (
                  <div
                    key={tshirt.name}
                    onClick={() => handleTypeSelect(tshirt.name)}
                    className="flex items-center p-4 border rounded-lg mb-4 cursor-pointer hover:bg-light-gray transition"
                  >
                    <input
                      type="radio"
                      name="tshirt-type"
                      checked={order.type === tshirt.name}
                      onChange={() => handleTypeSelect(tshirt.name)}
                      className="mr-4"
                    />
                    <div>
                      <p className="font-medium text-deep-charcoal">{tshirt.name}</p>
                      <p className="text-sm text-gray-600">
                        {order.subcategory === 'Angshuk A+'
                          ? 'Price varies by quantity (৳170-222 for JHK Black)'
                          : `৳${tshirt.price} per unit`}
                      </p>
                      <p className="text-sm text-gray-600">{tshirt.desc}</p>
                    </div>
                  </div>
                ))}
                <button
                  onClick={prevStep}
                  className="mt-4 text-soft-teal hover:underline"
                >
                  Back
                </button>
              </div>
            )}
            {step === 3 && order.category === 'Jersey' && (
              <div>
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
                  {[
                    {
                      name: 'Jacquard',
                      price: 350,
                      desc: 'Intricate weave, premium feel',
                      preview: 'linear-gradient(45deg, #4B5EAA, #6B7280)',
                    },
                    {
                      name: 'Premium Jacquard',
                      price: 400,
                      desc: 'Luxury fabric, top-tier',
                      preview: 'linear-gradient(45deg, #2D3748, #4A5568)',
                    },
                    {
                      name: 'Box Mesh',
                      price: 300,
                      desc: 'Breathable, sporty design',
                      preview:
                        'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Crect x=\'0\' y=\'0\' width=\'10\' height=\'10\' fill=\'%23A0AEC0\'/%3E%3Crect x=\'10\' y=\'10\' width=\'10\' height=\'10\' fill=\'%23A0AEC0\'/%3E%3C/svg%3E")',
                    },
                    {
                      name: 'Chinigura',
                      price: 320,
                      desc: 'Unique texture, stylish',
                      preview: 'linear-gradient(45deg, #718096, #A0AEC0)',
                    },
                    {
                      name: 'Honeycomb',
                      price: 310,
                      desc: 'Lightweight, modern look',
                      preview:
                        'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M10 2L12 6H8L10 2Z M10 8L12 12H8L10 8Z M10 14L12 18H8L10 14Z\' fill=\'%23718096\'/%3E%3C/svg%3E")',
                    },
                    {
                      name: 'PP',
                      price: 290,
                      desc: 'Cost-effective, durable',
                      preview: 'linear-gradient(45deg, #CBD5E0, #E2E8F0)',
                    },
                  ].map((fabric) => (
                    <div
                      key={fabric.name}
                      onClick={() => handleTypeSelect(fabric.name)}
                      className="flex items-start p-4 border rounded-lg cursor-pointer hover:bg-light-gray transition"
                    >
                      <input
                        type="radio"
                        name="jersey-fabric"
                        checked={order.type === fabric.name}
                        onChange={() => handleTypeSelect(fabric.name)}
                        className="mt-1 mr-4"
                      />
                      <div>
                        <div
                          className="w-12 h-12 rounded mb-2"
                          style={{ background: fabric.preview }}
                        ></div>
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
              </div>
            )}
            {step === 4 && (
              <div>
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
              </div>
            )}
            {step === 5 && (
              <div>
                <h3 className="text-xl font-semibold text-deep-charcoal mb-4">
                  Choose Quantity
                </h3>
                <input
                  type="number"
                  min="10"
                  max="1000"
                  value={order.quantity}
                  onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 10)}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-soft-teal"
                />
                <p className="text-sm text-gray-600 mt-2">
                  Minimum order: 10 units. Max: 1000.
                  {order.category === 'T-shirt' && order.subcategory === 'Angshuk A+' ? (
                    <> Current price per unit: ৳{currentPricePerUnit}</>
                  ) : (
                    ''
                  )}
                </p>
                <button
                  onClick={prevStep}
                  className="mt-4 text-soft-teal hover:underline mr-4"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(6)}
                  className="mt-4 bg-soft-teal text-off-white px-4 py-2 rounded-lg hover:bg-teal-600 transition"
                >
                  Next
                </button>
              </div>
            )}
            {step === 6 && (
              <div>
                <h3 className="text-xl font-semibold text-deep-charcoal mb-4">
                  Customization (Optional)
                </h3>
                <div className="mb-4">
                  <label className="block text-deep-charcoal mb-2">Text</label>
                  <input
                    type="text"
                    value={order.text}
                    onChange={(e) => handleTextChange(e.target.value)}
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-soft-teal"
                    placeholder="Enter text (e.g., Team Name, max 50 chars)"
                  />
                  <p className="text-sm text-gray-600 mt-1">
                    {order.text.length}/50 characters
                  </p>
                </div>
                <div className="mb-4">
                  <label className="block text-deep-charcoal mb-2">Upload Your Own Design</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleDesignChange}
                    className="w-full p-2 border rounded-lg"
                  />
                  {order.design && (
                    <img
                      src={order.design}
                      alt="Uploaded Design"
                      className="mt-4 h-20 rounded"
                    />
                  )}
                </div>
                <div className="mb-4">
                  <label className="block text-deep-charcoal mb-2">Number of Colors Used</label>
                  <select
                    value={order.colorsUsed}
                    onChange={(e) => handleColorsUsedChange(e.target.value)}
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-soft-teal"
                  >
                    <option value="0">0 Colors</option>
                    <option value="1">1 Color (৳10 per unit)</option>
                    <option value="2">2 Colors (৳20 per unit)</option>
                    <option value="3">3 Colors (৳30 per unit)</option>
                  </select>
                  <p className="text-sm text-gray-600 mt-1">
                    Additional cost: ৳10 per color per unit
                  </p>
                </div>
                <button
                  onClick={prevStep}
                  className="mt-4 text-soft-teal hover:underline mr-4"
                >
                  Back
                </button>
                <button
                  onClick={handleSubmit}
                  className="mt-4 bg-soft-teal text-off-white px-4 py-2 rounded-lg hover:bg-teal-600 transition"
                >
                  Submit Order
                </button>
              </div>
            )}
          </div>
          {/* Preview & Price */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow sticky top-24">
              <h3 className="text-xl font-semibold text-deep-charcoal mb-4">
                Order Preview
              </h3>
              <div className="relative h-48 bg-light-gray rounded flex items-center justify-center mb-4">
                {order.category ? (
                  <>
                    <img
                      src={order.category === 'T-shirt' ? TshirtSvg : JerseySvg}
                      alt={order.category}
                      className="h-32"
                      style={{
                        filter:
                          order.color && order.color !== 'White'
                            ? `hue-rotate(${
                                order.color === 'Blue'
                                  ? '220deg'
                                  : order.color === 'Red'
                                  ? '0deg'
                                  : '0deg'
                              })`
                            : 'none',
                      }}
                    />
                    {order.text && (
                      <span className="absolute text-sm text-deep-charcoal font-semibold">
                        {order.text}
                      </span>
                    )}
                    {order.design && (
                      <img
                        src={order.design}
                        alt="Design"
                        className="absolute h-12 bottom-4 right-4"
                      />
                    )}
                  </>
                ) : (
                  'Select options to preview'
                )}
              </div>
              <h3 className="text-xl font-semibold text-deep-charcoal mb-4">
                Price Estimate
              </h3>
              <div className="text-gray-600">
                <p>Base Price: ৳{price.base}</p>
                <p>Text: ৳{price.text}</p>
                <p>Design: ৳{price.design}</p>
                <p>Colors: ৳{price.colors}</p>
                <p>Setup Fee: ৳{price.setupFee}</p>
                <p>Discount: -৳{price.discount}</p>
                <p className="text-coral font-bold mt-2">
                  Total: ৳{price.total}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-off-white p-8 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-2xl font-bold text-deep-charcoal mb-4">
              Order Confirmed
            </h2>
            <p className="text-gray-600 mb-4">
              Thank you for your order! Here’s a summary:
            </p>
            <p className="text-gray-600">
              <strong>Category:</strong> {order.category}
            </p>
            <p className="text-gray-600">
              <strong>Subcategory:</strong> {order.subcategory || 'N/A'}
            </p>
            <p className="text-gray-600">
              <strong>Type/Fabric:</strong> {order.type}
            </p>
            <p className="text-gray-600">
              <strong>Color:</strong> {order.color}
            </p>
            <p className="text-gray-600">
              <strong>Quantity:</strong> {order.quantity}
            </p>
            <p className="text-gray-600">
              <strong>Text:</strong> {order.text || 'None'}
            </p>
            <p className="text-gray-600">
              <strong>Design:</strong> {order.design ? 'Included' : 'None'}
            </p>
            <p className="text-gray-600">
              <strong>Colors Used:</strong> {order.colorsUsed}
            </p>
            <p className="text-coral font-bold mt-4">
              Total: ৳{price.total}
            </p>
            <button
              onClick={() => {
                setShowConfirmation(false);
                setStep(1);
                setOrder({
                  category: null,
                  subcategory: null,
                  type: null,
                  color: null,
                  quantity: 10,
                  text: '',
                  design: null,
                  colorsUsed: 0,
                });
              }}
              className="mt-6 bg-soft-teal text-off-white px-4 py-2 rounded-lg hover:bg-teal-600 transition w-full"
            >
              Start New Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Order;