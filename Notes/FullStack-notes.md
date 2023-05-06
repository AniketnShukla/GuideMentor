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

