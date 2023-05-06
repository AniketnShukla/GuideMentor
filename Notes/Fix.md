Fix
2.Implement deletion of quote
2.Implement deletion of emotion
4.Rectify active emotion css
7.Restrict emotion input to not mess the ui of emotioncircle
9.fix email input, takes in wrong iunput on submit and why do we need email?
11.img not updating when author not set check
12.implementation at the backend to login with either username or email works, but the frontend uses sessionStorage 
    and the username specificaly to fetch all the details to display, use jwt and make the login and signup process proper
    along with decoupling the username with the fetching of details, will be commenting out the backend email or user login implementation.
14. Add a randomiser for backgrounds on start page, signup and login pages (combine the randomiser into one or make a module?).
15. Download more background images for start page and unregisteredAuthors
16.Disallow Duplicate quotes.

WORK ON DELETING QUOTES AND EMOTIONS NEXT.
16.password check doesnt work dumbass Wow
17. Work on :active or:focussed learn what it is and implemetn outline blue() on navbar and emotionCircle.
18.Right or left align all Navbar elements. ??QUICKFIX
20. Navbar links only working on click of texts, fix to make the entire button link to intended page.
21. Make a loader spinner at location search(ctrl+shift+F 'make a loader')
22. Navbar jumps from shown to hidden on switching pages, make the boolean value it a redux state variable so it stays the same on all pages.
23. On <App />, switching from Loading ... to showing data is snappy, put a transition so it looks good.
24.Add css for loading on <App />