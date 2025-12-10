document.addEventListener('DOMContentLoaded', async () => {
  const activities = [
    { date: '2025-10-18', activity: 'Temple Visit', location: 'Lisbon Temple' },
    { date: '2025-11-08', activity: 'Service Project: Park Cleanup', location: 'City Park' },
    { date: '2025-11-22', activity: 'Sports Night: Futsal', location: 'Ward Building' },
    { date: '2025-12-13', activity: 'Christmas Caroling', location: 'Neighborhood' },
    { date: '2025-12-20', activity: 'End-of-Year Party', location: "Bishop's House" },
  ];

  // Convert date strings to Date objects for sorting
  const processedActivities = activities.map((act) => ({
    ...act,
    date: new Date(act.date),
  }));

  const tableBody = document.getElementById('activities-table');

  if (tableBody) {
    processedActivities.forEach((activity) => {
      const row = document.createElement('tr');

      const dateCell = document.createElement('td');
      dateCell.textContent = activity.date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: 'UTC', // Ensure date is not shifted by local timezone
      });
      row.appendChild(dateCell);

      row.innerHTML += `<td>${activity.activity}</td><td>${activity.location}</td>`;

      tableBody.appendChild(row);
    });
  }

  // get holidays
  const holidaysContainer = document.getElementById('past-holidays');
  const holidaysTitle = document.querySelector('.holidays h2');

  if (holidaysContainer && holidaysTitle) {
    holidaysTitle.textContent = 'Upcoming Holidays';

    try {
      const currentYear = new Date().getFullYear();
      const responseCurrYear = await fetch(
        `https://date.nager.at/api/v3/PublicHolidays/${currentYear}/US`
      );
      const responseNextYear = await fetch(
        `https://date.nager.at/api/v3/PublicHolidays/${currentYear + 1}/US`
      );
      const holidaysCurrYear = await responseCurrYear.json();
      const holidaysNextYear = await responseNextYear.json();
      let holidays = [...holidaysCurrYear, ...holidaysNextYear];
      const today = new Date();
      let upcomingHolidays = holidays.filter((holiday) => {
        const holidayDate = new Date(holiday.date);
        return holidayDate >= today;
      });
      upcomingHolidays = upcomingHolidays.slice(0, 5);

      if (upcomingHolidays.length > 0) {
        const ul = document.createElement('ul');
        upcomingHolidays.forEach((holiday) => {
          const li = document.createElement('li');
          const holidayDate = new Date(holiday.date);
          li.textContent = `${holidayDate.toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            timeZone: 'UTC',
          })}: ${holiday.name}`;
          ul.appendChild(li);
        });
        holidaysContainer.appendChild(ul);
      } else {
        holidaysContainer.textContent = 'No upcoming holidays to display.';
      }
    } catch (error) {
      holidaysContainer.textContent = 'Failed to load holidays.';
      console.error('Error fetching holidays:', error);
    }
  }
});
