import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqData = [
  {
    id: 1,
    question: "What is disaster management?",
    answer:
      "Disaster management is the process of preparing for, responding to, and recovering from natural or man-made disasters. It involves risk reduction, emergency response, and rehabilitation efforts.",
  },
  {
    id: 2,
    question: "How can I prepare for a natural disaster?",
    answer:
      "Keep an emergency kit with food, water, medicine, flashlight, and important documents. Know your nearest shelter and practice evacuation drills.",
  },
  {
    id: 3,
    question: "What should I do during an earthquake?",
    answer:
      "Drop, cover, and hold on. Stay away from windows and heavy objects. If outside, move to an open area away from buildings and power lines.",
  },
  {
    id: 4,
    question: "How can communities reduce disaster risks?",
    answer:
      "Communities can plant trees, improve drainage systems, build stronger homes, avoid risky areas, and conduct awareness programs and drills.",
  },
  {
    id: 5,
    question: "Where can I get help after a disaster?",
    answer:
      "You can contact local authorities, emergency hotlines, or NGOs. Relief organizations provide food, shelter, and medical support.",
  },
];

const FAQ = () => {
  const [openId, setOpenId] = useState(null);

  const toggleItem = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="py-16 px-6 sm:px-12 lg:px-20  transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-5xl tracking-widest text-center mt-28  text-gray-800 font-anton dark:text-white mb-7">
            Frequently Asked Questions
          </h2>
          <p className="mt-2 tracking-wider text-lg text-gray-600 dark:text-gray-300">
            Common questions about disaster preparedness and response
          </p>
        </div>

        {/* FAQ List */}
        <div className="space-y-6">
          {faqData.map((item) => (
            <div
              key={item.id}
              className="border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm"
            >
              <button
                onClick={() => toggleItem(item.id)}
                className="w-full flex justify-between items-center p-5 text-left text-gray-900 dark:text-white font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <span>{item.question}</span>
                <span className="flex-shrink-0 w-8 h-8 border border-gray-400 dark:border-gray-500 rounded-full flex items-center justify-center">
                  {openId === item.id ? (
                    <Minus className="w-4 h-4" />
                  ) : (
                    <Plus className="w-4 h-4" />
                  )}
                </span>
              </button>

              {openId === item.id && (
                <div className="px-5 pb-5 text-gray-700 dark:text-gray-300">
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Still have questions?
          </h3>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-md transition-colors">
            Contact Us
          </button>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
