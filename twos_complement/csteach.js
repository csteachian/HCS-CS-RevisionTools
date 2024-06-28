(function csteachLogo(position = 'bottom-right') {

  // define positions
  // helps reduce polluting css classes
  const offset = '1.5rem';
  const validPositions = {
    'top-left': { top: offset, left: offset },
    'top-right': { top: offset, right: offset },
    'bottom-left': { bottom: offset, left: offset },
    'bottom-right': { bottom: offset, right: offset },
  };

  // ensure positions are valid
  if (!validPositions.hasOwnProperty(position)) {
    console.warn(
      `${position} is not a valid position, defaulting to bottom-left`,
    );
    position = 'bottom-left';
  }

  // create link & styles
  const badgeAnchor = document.createElement('a');
  Object.assign(badgeAnchor, {
    target: '_blank',
    href: 'https://www.csteach.uk',
  });

  // create badge image & styles
  const badgeImage = document.createElement('img');
  badgeImage.src = `csteach-button.png`;
  badgeImage.id = 'csteachlogo';
  Object.assign(badgeImage.style, validPositions[position]);

  // inject styles
  document.head.insertAdjacentHTML(
    'beforeend',
    `
    <style>
      #csteachlogo {
        position: fixed;
        cursor: pointer;
        z-index: 100;
        transition: transform 100ms ease-in-out;
      }

      #csteachlogo:hover {
        transform: scale(1.05);
      }
    </style>
  `,
  );

  // append badge to page
  badgeAnchor.appendChild(badgeImage);
  document.body.appendChild(badgeAnchor);
})(
  document.currentScript.getAttribute('position'),
);