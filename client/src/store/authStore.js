import { create } from "zustand";
import axios from "axios";

const BASE_URL =
	import.meta.env.MODE === "development"
		? "http://localhost:5000/api"
		: import.meta.env.VITE_API_URL || "/api";


const AUTH_API = `${BASE_URL}/auth`;
const RESERVATION_API = `${BASE_URL}/reservations`;

axios.defaults.withCredentials = true;

export const useAuthStore = create((set) => ({
	user: null,
	isAuthenticated: false,
	error: null,
	isLoading: false,
	isCheckingAuth: true,
	message: null,
	reservation: null,

	signup: async (email, password, name) => {
		set({ isLoading: true, error: null });
		try {
			const response = await axios.post(`${AUTH_API}/signup`, { email, password, name });
			set({ user: response.data.user, isAuthenticated: true, isLoading: false });
		} catch (error) {
			set({ error: error.response.data.message || "Error signing up", isLoading: false });
			throw error;
		}
	},

	login: async (email, password) => {
		set({ isLoading: true, error: null });
		try {
			const response = await axios.post(`${AUTH_API}/login`, { email, password });
			set({ isAuthenticated: true, user: response.data.user, error: null, isLoading: false });
		} catch (error) {
			set({ error: error.response?.data?.message || "Error logging in", isLoading: false });
			throw error;
		}
	},

	logout: async () => {
		set({ isLoading: true, error: null });
		try {
			await axios.post(`${AUTH_API}/logout`);
			set({ user: null, isAuthenticated: false, error: null, isLoading: false });
		} catch (error) {
			set({ error: "Error logging out", isLoading: false });
			throw error;
		}
	},

	verifyEmail: async (code) => {
		set({ isLoading: true, error: null });
		try {
			const response = await axios.post(`${AUTH_API}/verify-email`, { code });
			set({ user: response.data.user, isAuthenticated: true, isLoading: false });
			return response.data;
		} catch (error) {
			set({ error: error.response.data.message || "Error verifying email", isLoading: false });
			throw error;
		}
	},

	checkAuth: async () => {
		set({ isCheckingAuth: true, error: null });
		try {
			const response = await axios.get(`${AUTH_API}/check-auth`);
			set({ user: response.data.user, isAuthenticated: true, isCheckingAuth: false });
		} catch (error) {
			set({ error: null, isCheckingAuth: false, isAuthenticated: false });
		}
	},

	forgotPassword: async (email) => {
		set({ isLoading: true, error: null });
		try {
			const response = await axios.post(`${AUTH_API}/forgot-password`, { email });
			set({ message: response.data.message, isLoading: false });
		} catch (error) {
			set({
				isLoading: false,
				error: error.response.data.message || "Error sending reset password email",
			});
			throw error;
		}
	},

	resetPassword: async (token, password) => {
		set({ isLoading: true, error: null });
		try {
			const response = await axios.post(`${AUTH_API}/reset-password/${token}`, { password });
			set({ message: response.data.message, isLoading: false });
		} catch (error) {
			set({
				isLoading: false,
				error: error.response.data.message || "Error resetting password",
			});
			throw error;
		}
	},

	createReservation: async (reservationData) => {
		set({ isLoading: true, error: null, message: null });

		try {
			const formData = new FormData();

			// Append all fields
			for (const key in reservationData) {
				formData.append(key, reservationData[key]);
			}

			const response = await axios.post(`${RESERVATION_API}/create-reservation`, formData, {
				headers: {
					'Content-Type': 'multipart/form-data'
				},
				withCredentials: true
			});

			set({
				reservation: response.data.reservation,
				message: response.data.message || 'Reservation created successfully',
				isLoading: false,
				error: null
			});

			return response.data;

		} catch (error) {
			let errorMessage = "Error creating reservation";

			if (error.response) {
				errorMessage = error.response.data?.message || errorMessage;
			}

			set({ isLoading: false, error: errorMessage });
			throw new Error(errorMessage);
		}
	},

	getReservations: async () => {
		set({ isLoading: true, error: null });

		try {
			const response = await axios.get(`${RESERVATION_API}/user`, { withCredentials: true });
			set({ reservations: response.data.reservations, isLoading: false });
		} catch (error) {
			set({
				error: error.response?.data?.message || "Error retrieving reservations",
				isLoading: false
			});
			throw error;
		}
	},


	cancelReservation: async (reservationId) => {
		set({ isLoading: true, error: null });

		try {
			console.log("Canceling reservation:", reservationId);

			const response = await axios.post(
				`${RESERVATION_API}/cancel/${reservationId}`,
				{},
				{ withCredentials: true }
			);

			// ✅ Refresh reservations from the server
			await useAuthStore.getState().getReservations();

			set({
				isLoading: false,
				message: response.data.message || 'Reservation canceled successfully',
			});

			return response.data;
		} catch (error) {
			set({
				error: error.response?.data?.message || "Error canceling reservation",
				isLoading: false,
			});
			throw error;
		}
	},

}));
