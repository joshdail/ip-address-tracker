# Frontend Mentor - IP address tracker solution

This is a solution to the [IP address tracker challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/ip-address-tracker-I8-0yYAH0).

### Links

- Solution URL: [https://github.com/joshdail/ip-address-tracker](https://github.com/joshdail/ip-address-tracker)
- Live Site URL: [https://joshdail.github.io/ip-address-tracker/](https://joshdail.github.io/ip-address-tracker/)

### Modifications

- Search bar has an added outline for focus state to improve visibility
- Dark mode if the browser prefers a dark color scheme
- I used [IPAPI](https://ipapi.com) instead of IP Geolocation API for looking up IP addresses, since it does not require an API key and has a more generous free tier. This does come at the cost of the app not being able to take domain names as input. Only IPV4 and IPV6 addresses can be accepted
- The results bar is designed to have a responsive rather than a fixed width. This is mainly to accommodate longer IPV6 addresses or location names

### Useful resources

- [Regex for IPV4 addresses](https://www.oreilly.com/library/view/regular-expressions-cookbook/9780596802837/ch07s16.html) - By O'Reilly learning platform
- [Regex for IPV6 addresses](https://community.fortra.com/forums/intermapper/miscellaneous-topics/5acc4fcf-fa83-e511-80cf-0050568460e4) - By Stephen Ryan
- [Leaflet documentation](https://leafletjs.com/reference.html) - By Volodymyr Agafonkin

## Author

- Github - [joshdail](https://www.github.com/joshdail)
- Frontend Mentor - [@joshdail](https://www.frontendmentor.io/profile/joshdail)
