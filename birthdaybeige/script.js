
document.getElementById('beige-generator').addEventListener('click', function() {
  // Generate a random beige color
  const beigeShades = [
    '#F5F5DC', '#EEDC82', '#DEB887', '#D2B48C', '#F5DEB3'
  ];
  const randomBeige = beigeShades[Math.floor(Math.random() * beigeShades.length)];

  // Change the background color of the body
  document.body.style.backgroundColor = randomBeige;
});
