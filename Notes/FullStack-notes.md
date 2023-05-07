>>Things to learn:
1.Standard Signup, Login.
2.Proper Project Planning
3.Conditional client side rendering, properly.
4.React Thunk? RTK Query?

>>Things that fucked me over:
1.Mobile responsive, overflow fix: positiion relative on first child, because mobile ignores body, html css.
2.Conditional client side routing, error in main.jsx of this website was checking if user was logged in not as a state, not sure what the standard way of doing it is, but switched the boolean variable to function call itself, and works now.
3.Deploying on render.com -> redirect/Rewrite rules for client side routing - /* /index.html Rewrite - must and should, for static site, client path, the scripts, npm build.
4.React using two actions or two dispatch together, reworked everything back, removed redux usage in that context, worked around it other ways
5.Axios get request in deployemnet gave axios network errors said build/index.html not found, ->post request even empty worked

Questions
1.How does css written in one file, apply to a react component (jsx) that does not even import that css file (myspace.css #loading applies to <App /> wihtout ipmorting myspace.css in it, althought I still put the css in app.css just to be safe, it worked without putting the css in app.css.)