export const navBarResponse = `
$navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

if ($navbarBurgers.length > 0) {

    $navbarBurgers.forEach( el => {
        el.addEventListener('click', () => {
            const target = el.dataset.target;
            const $target = document.getElementById(target);

            el.classList.toggle('is-active');
            $target.classList.toggle('is-active');
            const $navbarDropdowns = Array.prototype.slice.call(document.querySelectorAll('.dropdown'), 0);
            $navbarDropdowns.forEach( drop => {
                drop.classList.toggle('is-right');
            });
        });
    });
}
`;
