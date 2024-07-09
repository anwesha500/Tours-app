import React, { useState, useEffect } from 'react';
import { getUsers, deleteBooking, addBooking, updateBooking } from '../api';
import '../css/BookingDetails.css'; // Import CSS file for styling

const BookingDetails = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [newBooking, setNewBooking] = useState({
    tourName: '',
    priceTier: '',
    numberOfPeople: '',
    currency: '',
    totalAmount: '',
  });
  const [editingBooking, setEditingBooking] = useState(null);
  const [editFormData, setEditFormData] = useState({
    tourName: '',
    priceTier: '',
    numberOfPeople: '',
    currency: '',
    totalAmount: '',
  });

  useEffect(() => {
    const fetchUsersWithBookings = async () => {
      try {
        const fetchedUsers = await getUsers();
        // Initialize each user with collapsed state set to true
        const usersWithCollapsed = fetchedUsers.map(user => ({ ...user, collapsed: true }));
        setUsers(usersWithCollapsed);
      } catch (error) {
        console.error('Error fetching users with bookings:', error);
      }
    };

    fetchUsersWithBookings();
  }, []);

  const toggleCollapse = (userId) => {
    setUsers(prevUsers =>
      prevUsers.map(user =>
        user._id === userId ? { ...user, collapsed: !user.collapsed } : user
      )
    );
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDeleteBooking = async (userId, bookingId) => {
    try {
      console.log('Deleting booking:', userId, bookingId);
      await deleteBooking(userId, bookingId);
      console.log('Booking deleted successfully.');
      // Update state to reflect the deletion
      setUsers(prevUsers =>
        prevUsers.map(user =>
          user._id === userId
            ? { ...user, bookings: user.bookings.filter(booking => booking._id !== bookingId) }
            : user
        )
      );
    } catch (error) {
      console.error('Error deleting booking:', error);
      // Handle error as needed
    }
  };

  const handleAddBookingChange = (event) => {
    const { name, value } = event.target;
    setNewBooking(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleAddBooking = async (userId) => {
    try {
      await addBooking(userId, newBooking);
      setNewBooking({
        tourName: '',
        priceTier: '',
        numberOfPeople: '',
        currency: '',
        totalAmount: '',
      });
      // Refresh user data to reflect the new booking
      const fetchedUsers = await getUsers();
      const usersWithCollapsed = fetchedUsers.map(user => ({ ...user, collapsed: true }));
      setUsers(usersWithCollapsed);
    } catch (error) {
      console.error('Error adding booking:', error);
    }
  };

  const handleEditBooking = (booking) => {
    setEditingBooking(booking._id);
    setEditFormData({
      tourName: booking.tourName,
      priceTier: booking.priceTier,
      numberOfPeople: booking.numberOfPeople,
      currency: booking.currency,
      totalAmount: booking.totalAmount,
    });
  };

  const handleEditFormChange = (event) => {
    const { name, value } = event.target;
    setEditFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleUpdateBooking = async (userId, bookingId) => {
    try {
      const updatedBooking = await updateBooking(userId, bookingId, editFormData);
      // Update state to reflect the updated booking
      setUsers(prevUsers =>
        prevUsers.map(user =>
          user._id === userId
            ? {
                ...user,
                bookings: user.bookings.map(booking =>
                  booking._id === bookingId ? updatedBooking : booking
                )
              }
            : user
        )
      );
      setEditingBooking(null);
      console.log('Booking updated successfully.');
    } catch (error) {
      console.error('Error updating booking:', error);
      // Handle error as needed
    }
  };

  const handleCancelEdit = () => {
    setEditingBooking(null);
    setEditFormData({
      tourName: '',
      priceTier: '',
      numberOfPeople: '',
      currency: '',
      totalAmount: '',
    });
  };

  return (
    <div className="booking-details">
      <h2>Booking Details</h2>
      <input
        type="text"
        placeholder="Search users..."
        value={searchQuery}
        onChange={handleSearchChange}
        className="search-input"
      />
      {filteredUsers.map(user => (
        <div key={user._id} className="user-container">
          <div className="user-header" onClick={() => toggleCollapse(user._id)}>
            <div className="username">{user.username}</div>
            <div className="collapse-icon">{user.collapsed ? '+' : '-'}</div>
          </div>
          {!user.collapsed && (
            <div className="booking-table">
              <table>
                <thead>
                  <tr>
                    <th>Tour Name</th>
                    <th>Price Tier</th>
                    <th>Date</th>
                    <th>Number of People</th>
                    <th>Total Amount</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {user.bookings.map(booking => (
                    <tr key={booking._id}>
                      <td>
                        {editingBooking === booking._id ? (
                          <input
                            type="text"
                            name="tourName"
                            value={editFormData.tourName}
                            onChange={handleEditFormChange}
                          />
                        ) : (
                          booking.tourName
                        )}
                      </td>
                      <td>
                        {editingBooking === booking._id ? (
                          <input
                            type="text"
                            name="priceTier"
                            value={editFormData.priceTier}
                            onChange={handleEditFormChange}
                          />
                        ) : (
                          booking.priceTier
                        )}
                      </td>
                      <td>{new Date(booking.timestamp).toLocaleDateString()}</td>
                      <td>
                        {editingBooking === booking._id ? (
                          <input
                            type="number"
                            name="numberOfPeople"
                            value={editFormData.numberOfPeople}
                            onChange={handleEditFormChange}
                          />
                        ) : (
                          booking.numberOfPeople
                        )}
                      </td>
                      <td>
                        {editingBooking === booking._id ? (
                          <input
                            type="number"
                            name="totalAmount"
                            value={editFormData.totalAmount}
                            onChange={handleEditFormChange}
                          />
                        ) : (
                          `${booking.totalAmount} ${booking.currency}`
                        )}
                      </td>
                      <td>
                        {editingBooking === booking._id ? (
                          <>
                            <button className="button-51 edit-button" onClick={() => handleUpdateBooking(user._id, booking._id)}>
                              Save
                            </button>
                            <button className="button-51 delete-button" onClick={handleCancelEdit}>
                              Cancel
                            </button>
                          </>
                        ) : (
                          <>
                            <button className="button-51 delete-button" onClick={() => handleDeleteBooking(user._id, booking._id)}>
                              Delete
                            </button>
                            <button className="button-51 edit-button" onClick={() => handleEditBooking(booking)}>
                              Edit
                            </button>
                          </>
                        )}
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="add-booking-form">
                <h3>Add Booking</h3>
                <input
                  type="text"
                  name="tourName"
                  placeholder="Tour Name"
                  value={newBooking.tourName}
                  onChange={handleAddBookingChange}
                />
                <input
                  type="text"
                  name="priceTier"
                  placeholder="Price Tier"
                  value={newBooking.priceTier}
                  onChange={handleAddBookingChange}
                />
                <input
                  type="number"
                  name="numberOfPeople"
                  placeholder="Number of People"
                  value={newBooking.numberOfPeople}
                  onChange={handleAddBookingChange}
                />
                <input
                  type="text"
                  name="currency"
                  placeholder="Currency"
                  value={newBooking.currency}
                  onChange={handleAddBookingChange}
                />
                <input
                  type="number"
                  name="totalAmount"
                  placeholder="Total Amount"
                  value={newBooking.totalAmount}
                  onChange={handleAddBookingChange}
                />
                <button onClick={() => handleAddBooking(user._id)}>
                  Add Booking
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default BookingDetails;
