import React, { useState, useEffect } from "react";
import { useAuthStore } from "../store/authStore";
import Avatar from "../assets/profile.png"; // Assuming this is a default avatar image
import LoadingSpinner from "../components/LoadingSpinner";
import { Link } from "react-router-dom";

export default function Profile() {
	const { user, reservations = [], getReservations, isLoading, cancelReservation } = useAuthStore();
	const [selectedReservation, setSelectedReservation] = useState(null);

	// Fetch reservations when the user is available
	useEffect(() => {
		if (user?._id) {
			getReservations(user._id); // Fetch actual reservations from the store
		}
	}, [user, getReservations]);

	const handleCancelReservation = async (id) => {
		if (window.confirm("Are you sure you want to cancel this reservation?")) {
			try {
				await cancelReservation(id);
				alert("Reservation canceled successfully.");
			} catch (error) {
				alert("There was an error canceling the reservation.");
			}
		}
	};

	// Sort reservations by check-in date and status
	const sortedReservations = reservations
		.sort((a, b) => {
			// Sort by check-in date (earliest first)
			return new Date(a.checkIn) - new Date(b.checkIn);
		})
		.sort((a, b) => {
			// Sort by status (pending first, then completed, then cancelled)
			const statusOrder = {
				pending: 1,
				confirmed: 2,
				completed: 3,
				cancelled: 4,
			};
			return statusOrder[a.status] - statusOrder[b.status];
		});

	if (isLoading || !user) return <LoadingSpinner />; // Show loading state while data is being fetched

	return (
		<div className="min-h-screen bg-gray-100 py-16 px-4 pt-22">
			<div className="max-w-5xl mx-auto space-y-10">
				{/* Profile Header */}
				<div className="flex flex-col md:flex-row items-center bg-white rounded-lg shadow-md p-6">
					<img
						src={user.avatar || Avatar} // Default to Avatar if no avatar exists
						alt="Avatar"
						className="w-28 h-28 rounded-full object-cover border-4 border-blue-600 mb-4 md:mb-0 md:mr-6"
					/>
					<div>
						<h1 className="text-2xl font-bold">{user.name}</h1>
						<p className="text-gray-600">{user.email}</p>
						<p className="text-sm text-gray-500 mt-1">
							Member since{" "}
							{new Date(user.createdAt).toLocaleDateString("en-US", {
								year: "numeric", month: "long", day: "numeric",
							})}
						</p>
					</div>
				</div>

				{/* Reservations Section */}
				<div className="bg-white rounded-lg shadow-md p-6">
					<h2 className="text-xl font-semibold text-blue-700 mb-4">My Reservations</h2>

					{sortedReservations.length === 0 ? (
						<div className="text-center py-10">
							<p className="text-gray-500 mb-4">You haven't made any reservations yet.</p>
							<a href="/cottages" className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
								Book a Cottage Now
							</a>
						</div>
					) : (
						sortedReservations.map((res) => (
							<div key={res._id} className="border border-gray-200 rounded-md p-4 mb-4 shadow-sm">
								<div className="flex justify-between items-center mb-3">
									<span className="font-semibold text-blue-600">Booking #{res._id.slice(-6)}</span>

									<span className={`px-3 py-1 rounded-full text-sm font-medium ${{
										pending: "bg-yellow-100 text-yellow-800",
										confirmed: "bg-green-100 text-green-800",
										cancelled: "bg-red-100 text-red-700",
										completed: "bg-blue-100 text-blue-700",
									}[res.status] || "bg-gray-100 text-gray-800"  // Fallback to a default status style
										}`}>
										{res.status ? res.status.charAt(0).toUpperCase() + res.status.slice(1) : "Unknown Status"} {/* Safeguard for undefined status */}
									</span>
								</div>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
									<div>
										<p className="text-gray-500">Cottage</p>
										<p className="font-medium">{res.cottageName}</p>
									</div>
									<div>
										<p className="text-gray-500">Check-in</p>
										<p className="font-medium">
											{new Date(res.checkIn).toDateString()}
										</p>
									</div>
									<div>
										<p className="text-gray-500">Check-out</p>
										<p className="font-medium">
											{new Date(res.checkOut).toDateString()}
										</p>
									</div>
									<div>
										<p className="text-gray-500">Total</p>
										<p className="font-medium">₱{res.totalAmount.toFixed(2)}</p>
									</div>
								</div>
								<div className="mt-4 flex justify-between items-center gap-3">
									<button
										onClick={() => setSelectedReservation(res)}
										className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
									>
										View Details
									</button>

									{["pending", "confirmed"].includes(res.status) && (
										<button
											onClick={() => handleCancelReservation(res._id)}
											className="px-4 py-2 text-sm bg-gray-300 text-black rounded hover:bg-gray-400"
										>
											Cancel
										</button>
									)}

									{/* Show cancellation reason only if status is cancelled */}
									{res.status === "cancelled" && res.cancelReason && (
										<div className="text-sm text-red-600 font-medium">
											<p><strong className="text-blue-500">Cancellation Reason:</strong> {res.cancelReason}</p>
										</div>
									)}
								</div>
							</div>
						))
					)}
				</div>

				{/* Modal for Reservation Details */}
				{selectedReservation && (
					<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
						<div className="bg-white rounded-lg p-6 w-full max-w-xl relative">
							<button
								className="absolute top-3 right-4 text-gray-500 text-2xl font-bold"
								onClick={() => setSelectedReservation(null)}
							>
								×
							</button>
							<h2 className="text-xl font-semibold text-blue-700 mb-4 border-b">
								Personal Details
							</h2>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
								<Detail label="Name" value={selectedReservation.guestName} />
								<Detail label="Email" value={selectedReservation.email} />
								<Detail label="Contact Number" value={selectedReservation.contactNumber} />
								<Detail label="Address" value={selectedReservation.address} />
							</div>
							<h2 className="text-xl font-semibold text-blue-700 mt-4 mb-4  border-b">
								Reservation Details
							</h2>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
								<Detail label="Reservation ID" value={selectedReservation._id} />
								<Detail label="Status" value={selectedReservation.status} />
								<Detail label="Cottage Name" value={selectedReservation.cottageName} />
								<Detail label="Cottage Price" value={`₱${selectedReservation.cottagePrice}/head`} />
								<Detail label="Number of Guests" value={selectedReservation.numberOfGuest} />
								<Detail label="Check-in" value={new Date(selectedReservation.checkIn).toDateString()} />
								<Detail label="Check-out" value={new Date(selectedReservation.checkOut).toDateString()} />
								<Detail label="Total Amount" value={`₱${selectedReservation.totalAmount}`} />
							</div>
							<h2 className="text-xl font-semibold text-center text-blue-700 mt-4 mb-4  border-b">
								Proof of Payment
							</h2>
							<div className="flex flex-col justify-center items-center">
								<label htmlFor="proofOfpayment">Receipt</label>
								<Detail
									label=""
									value={
										<img
											className="h-[200px] border border-gray-400 rounded-md shadow-md mt-2"
											src={selectedReservation.proofOfPayment}
											alt="Proof of Payment"
										/>
									}
								/>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

function Detail({ label, value }) {
	return (
		<div>
			<p className="text-gray-500">{label}</p>
			<p className="font-medium">{value}</p>
		</div>
	);
}