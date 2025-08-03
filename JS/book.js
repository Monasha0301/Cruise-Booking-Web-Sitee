const pricing = {
    destinations: {
        'Caribbean': 1300,
        'Mediterranean': 2100,
        'Alaska': 3500,
        'Dubai': 2250,
        'Norwegian Fjords': 2350,
        'Bahamas': 1500,
        'Hawaii': 2200,
        'Thailand': 2300
    },
    cabinUpgrades: {
        'Interior': 100,
        'Ocean View': 200,
        'Balcony': 400,
        'Suite': 800
    }
};

function calculateTotal() {
    console.log('Calculating total...');

    const destination = document.getElementById('destination').value;
    const guests = parseInt(document.getElementById('guests').value) || 0;
    const rooms = parseInt(document.getElementById('rooms').value) || 0;
    const cabin = document.getElementById('cabin').value;

    console.log('Values:', { destination, guests, rooms, cabin });

    if (destination && guests > 0 && rooms > 0 && cabin) {
        const basePrice = pricing.destinations[destination] || 0;
        const cabinUpgrade = pricing.cabinUpgrades[cabin] || 0;
        const subtotal = (basePrice + cabinUpgrade) * guests;
        const taxes = subtotal * 0.12;
        const total = subtotal + taxes;

        // Save total in localStorage for access on other pages
        localStorage.setItem('booking_total', Math.round(total));

        console.log('Calculation:', { basePrice, cabinUpgrade, subtotal, taxes, total });

        document.getElementById('totalDisplay').innerHTML = `
            <div style="background: #f8f9fa; padding: 15px; border-radius: 5px; border-left: 4px solid #007bff; margin-top: 20px;">
                <h3 style="margin: 0 0 10px 0; color: #2c3e50;">Price Breakdown</h3>
                <p style="margin: 5px 0;"><strong>Destination:</strong> ${destination}</p>
                <p style="margin: 5px 0;"><strong>Base Price per Person:</strong> $${basePrice.toLocaleString()}</p>
                <p style="margin: 5px 0;"><strong>Cabin Upgrade per Person:</strong> $${cabinUpgrade.toLocaleString()}</p>
                <p style="margin: 5px 0;"><strong>Number of Guests:</strong> ${guests}</p>
                <p style="margin: 5px 0;"><strong>Number of Rooms:</strong> ${rooms}</p>
                <p style="margin: 5px 0;"><strong>Subtotal:</strong> $${subtotal.toLocaleString()}</p>
                <p style="margin: 5px 0;"><strong>Taxes & Fees (12%):</strong> $${Math.round(taxes).toLocaleString()}</p>
                <p style="margin: 10px 0 0 0; font-size: 20px; color: #e74c3c;"><strong>Total: $${Math.round(total).toLocaleString()}</strong></p>
            </div>
        `;
    } else {
        document.getElementById('totalDisplay').innerHTML = '';
        console.log('Missing required fields');
    }
}

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, setting up event listeners...');

    // Add event listeners to form fields for real-time calculation
    const formFields = ['destination', 'guests', 'rooms', 'cabin'];
    formFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field) {
            field.addEventListener('change', calculateTotal);
            field.addEventListener('input', calculateTotal);
            console.log(`Event listener added to ${fieldId}`);
        } else {
            console.error(`Field ${fieldId} not found`);
        }
    });

    // Handle form submission
    const bookingForm = document.getElementById('booking-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(this);
            const bookingData = {
                destination: formData.get('destination'),
                guests: formData.get('guests'),
                rooms: formData.get('rooms'),
                cabin: formData.get('cabin'),
                requests: formData.get('requests') || ''
            };

            // Validate required fields
            if (!bookingData.destination || !bookingData.guests || !bookingData.rooms || !bookingData.cabin) {
                alert('Please fill in all required fields before proceeding to payment.');
                return;
            }

            // Include total from localStorage
            const total = localStorage.getItem('booking_total') || '0';
            bookingData.total = total;

            // Show booking confirmation box
            const confirmBooking = confirm(
            `Please confirm your booking:\n\n` +
            `Destination: ${bookingData.destination}\n` +
            `Guests: ${bookingData.guests}\n` +
            `Rooms: ${bookingData.rooms}\n` +
            `Cabin: ${bookingData.cabin}\n` +
            `Total: $${bookingData.total}\n\n` +
            `Click OK to proceed to payment or Cancel to review.`
            );

            if (!confirmBooking) {
            return; // User clicked Cancel
            }

            // Save booking data in localStorage
            localStorage.setItem('booking_destination', bookingData.destination);
            localStorage.setItem('booking_guests', bookingData.guests);
            localStorage.setItem('booking_rooms', bookingData.rooms);
            localStorage.setItem('booking_cabin', bookingData.cabin);
            localStorage.setItem('booking_requests', bookingData.requests);
            localStorage.setItem('booking_total', bookingData.total);

            // Redirect to payment.html with query params
            const params = new URLSearchParams(bookingData);
            window.location.href = `payment.html?${params.toString()}`;
        });

        console.log('Form submission handler added');
    } else {
        console.error('Booking form not found');
    }
});
