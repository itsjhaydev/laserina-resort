import React from 'react';

const TermsModal = ({ open, onClose }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-xl w-[90%] sm:w-[80%] md:w-[600px] max-h-[80vh] overflow-y-auto p-6">
        <h2 className="text-xl font-semibold mb-4">Terms and Conditions</h2>

        <div className="mb-4">
          <h3 className="text-lg font-medium mb-2">Reservation Policy:</h3>
          <ul className="list-disc list-inside space-y-1">
            <li>A 50% deposit is required to secure your reservation.</li>
            <li>Balance must be paid upon check-in.</li>
            <li>Reservation is subject to availability.</li>
          </ul>
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-medium mb-2">Cancellation Policy:</h3>
          <ul className="list-disc list-inside space-y-1">
            <li>Cancellations made 7 days or more before check-in will receive a full refund.</li>
            <li>Cancellations made within 3–6 days will receive a 50% refund.</li>
            <li>No refunds for cancellations made within 48 hours of check-in.</li>
          </ul>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-medium mb-2">General Policies:</h3>
          <ul className="list-disc list-inside space-y-1">
            <li>Check-in time: 2:00 PM | Check-out time: 12:00 NN</li>
            <li>Early check-in/late check-out subject to availability and additional charges.</li>
            <li>Valid ID is required upon check-in.</li>
            <li>Guests are responsible for any damage to property.</li>
            <li>Outside food and drinks may be subject to corkage fees.</li>
            <li>Pets are not allowed.</li>
            <li>Quiet hours are from 10:00 PM to 6:00 AM.</li>
          </ul>
        </div>

        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};

export default TermsModal;
