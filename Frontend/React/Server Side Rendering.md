Server-side rendering (abbreviated to “SSR” in this post) lets you generate HTML from React components on the server, and send that HTML to your users. SSR lets your users see the page’s content before your JavaScript bundle loads and runs.

SSR in React always happens in several steps:

-   On the server, fetch data for the entire app.
-   Then, on the server, render the entire app to HTML and send it in the response.
-   Then, on the client, load the JavaScript code for the entire app.
-   Then, on the client, connect the JavaScript logic to the server-generated HTML for the entire app (this is “hydration”).

The key part is that **each step had to finish for the entire app at once before the next step could start.** This is not efficient if some parts of your app are slower than others, as is the case in pretty much every non-trivial app.

## What Is SSR?

When the user loads your app, you want to show a fully interactive page as soon as possible:

[![](https://camo.githubusercontent.com/8b2ae54c1de6c1b24d9080d2a50a68141f7f57252803543c30cc69cdd4b82fa1/68747470733a2f2f717569702e636f6d2f626c6f622f5963474141416b314234322f784d50644159634b76496c7a59615f3351586a5561413f613d354748716b387a7939566d523255565a315a38746454627373304a7553335951327758516f3939666b586361)](https://camo.githubusercontent.com/8b2ae54c1de6c1b24d9080d2a50a68141f7f57252803543c30cc69cdd4b82fa1/68747470733a2f2f717569702e636f6d2f626c6f622f5963474141416b314234322f784d50644159634b76496c7a59615f3351586a5561413f613d354748716b387a7939566d523255565a315a38746454627373304a7553335951327758516f3939666b586361)

This illustration uses the green color to convey that these parts of the page are interactive. In other words, all their JavaScript event handlers are already attached, clicking buttons can update the state, and so on.

However, the page can’t be interactive before the JavaScript code for it fully loads. This includes both React itself and your application code. For non-trivial apps, much of the loading time will be spent downloading your application code.

If you don’t use SSR, the only thing the user will see while JavaScript is loading is a blank page:

[![](https://camo.githubusercontent.com/7fac45f105cd741a94db77234465c4c85843b1e6f902b21bbdb1fe5b52d25a05/68747470733a2f2f717569702e636f6d2f626c6f622f5963474141416b314234322f39656b30786570614f5a653842764679503244652d773f613d6131796c464577695264317a79476353464a4451676856726161375839334c6c726134303732794c49724d61)](https://camo.githubusercontent.com/7fac45f105cd741a94db77234465c4c85843b1e6f902b21bbdb1fe5b52d25a05/68747470733a2f2f717569702e636f6d2f626c6f622f5963474141416b314234322f39656b30786570614f5a653842764679503244652d773f613d6131796c464577695264317a79476353464a4451676856726161375839334c6c726134303732794c49724d61)

This is not great, and this is why we recommend using SSR. SSR lets you render your React components _on the server_ into HTML and send it to the user. HTML is not very interactive (aside from simple built-in web interactions like links and form inputs). However, it lets the user _see something_ while the JavaScript is still loading:

[![](https://camo.githubusercontent.com/e44ee4be56e56e74da3b9f7f5519ca6197b24e9c34488df933140950f1b31c38/68747470733a2f2f717569702e636f6d2f626c6f622f5963474141416b314234322f534f76496e4f2d73625973566d5166334159372d52413f613d675a6461346957316f5061434668644e36414f48695a396255644e78715373547a7a42326c32686b744a3061)](https://camo.githubusercontent.com/e44ee4be56e56e74da3b9f7f5519ca6197b24e9c34488df933140950f1b31c38/68747470733a2f2f717569702e636f6d2f626c6f622f5963474141416b314234322f534f76496e4f2d73625973566d5166334159372d52413f613d675a6461346957316f5061434668644e36414f48695a396255644e78715373547a7a42326c32686b744a3061)

Here, the grey color illustrates that these parts of the screen are not fully interactive yet. The JavaScript code for your app has not loaded yet, so clicking buttons doesn’t do anything. But especially for content-heavy websites, SSR is extremely useful because it lets users with worse connections start reading or looking at the content while JavaScript is loading.

When both React and your application code loads, you want to make this HTML interactive. You tell React: “Here’s the `App` component that generated this HTML on the server. Attach event handlers to that HTML!” React will render your component tree in memory, but instead of generating DOM nodes for it, it will attach all the logic to the existing HTML.

**This process of rendering your components and attaching event handlers is known as “hydration”.** It’s like watering the “dry” HTML with the “water” of interactivity and event handlers. (Or at least, that’s how I explain this term to myself.)

After hydration, it’s “React as usual”: your components can set state, respond to clicks, and so on:

[![](https://camo.githubusercontent.com/98a383f6de8ee2bde7516dc540aae6d9bb02a074c43c201ef6746bf3b8450420/68747470733a2f2f717569702e636f6d2f626c6f622f5963474141416b314234322f715377594e765a58514856423970704e7045344659673f613d6c3150774c4844306b664a61495971474930646a53567173574a345544324c516134764f6a6f4b7249785161)](https://camo.githubusercontent.com/98a383f6de8ee2bde7516dc540aae6d9bb02a074c43c201ef6746bf3b8450420/68747470733a2f2f717569702e636f6d2f626c6f622f5963474141416b314234322f715377594e765a58514856423970704e7045344659673f613d6c3150774c4844306b664a61495971474930646a53567173574a345544324c516134764f6a6f4b7249785161)

You can see that SSR is kind of a “magic trick”. It doesn’t make your app fully interactive faster. Rather, it lets you show a non-interactive version of your app sooner, so that the user can look at the static content while they wait for JS to load. However, this trick makes a huge difference for people with poor network connections, and improves the perceived performance overall. It also helps you with search engine ranking, both due to easier indexing and due to better speed.

_Note: don’t confuse SSR with Server Components. Server Components are a more experimental feature that is still in research and likely won’t be a part of the initial React 18 release. You can learn about Server Components [here](https://reactjs.org/blog/2020/12/21/data-fetching-with-react-server-components.html). Server Components are complementary to SSR, and will be a part of the recommended data fetching approach, but this post is not about them._

## What Are the Problems with SSR Today?

The approach above works, but in many ways it’s not optimal.

### You have to fetch everything before you can show anything

One problem with SSR today is that it does not allow components to “wait for data”. With the current API, by the time you render to HTML, you must already have all the data ready for your components on the server. This means that **you have to collect _all_ the data on the server before you can start sending _any_ HTML to the client.** This is quite inefficient.

For example, let’s say you want to render a post with comments. The comments are important to show early, so you want to include them in the server HTML output. But your database or API layer is slow, which is out of your control. Now you have to make some hard choices. If you exclude them from the server output, the user won’t see them until JS loads. But if you include them in the server output, you have to delay sending the rest of the HTML (for example, the navigation bar, the sidebar, and even the post content) until the comments have loaded and you can render the full tree. This is not great.

> As a side note, some data fetching solutions repeatedly try to render the tree to HTML and throw away the result until the data has been resolved because React doesn't provide a more ergonomic option. We’d like to provide a solution that doesn’t require such extreme compromises.

### You have to load everything before you can hydrate anything

After your JavaScript code loads, you’ll tell React to “hydrate” the HTML and make it interactive. React will “walk” the server-generated HTML while rendering your components, and attach the event handlers to that HTML. For this to work, the tree produced by your components in the browser must match the tree produced by the server. Otherwise React can’t “match them up!” A very unfortunate consequence of this is that **you have to load the JavaScript for _all_ components on the client before you can start hydrating _any_ of them.**

For example, let’s say that the comments widget contains a lot of complex interaction logic, and it takes a while to load JavaScript for it. Now you have to make a hard choice again. It would be good to render comments on the server to HTML in order to show them to the user early. But because hydration can only be done in a single pass today, you can’t start hydrating the navigation bar, the sidebar, and the post content until you’ve loaded the code for the comments widget! Of course, you could use code splitting and load it separately, but you would have to exclude comments from the server HTML. Otherwise React won’t know what to do with this chunk of HTML (where’s the code for it?) and delete it during hydration.

### You have to hydrate everything before you can interact with anything

There is a similar issue with hydration itself. Today, React hydrates the tree in a single pass. This means that once it’s started hydrating (which is essentially calling your component functions), React won’t stop until it’s finished doing this for the entire tree. As a consequence, **you have to wait for _all_ components to be hydrated before you can interact with _any_ of them.**

For example, let’s say the comments widget has expensive rendering logic. It might work fast on your computer, but on a low-end device running all of that logic is not cheap and may even lock up the screen for several seconds. Of course, ideally we wouldn’t have such logic on the client at all (and that’s something that Server Components can help with). But for some logic it’s unavoidable because it determines what the attached event handlers should do and is essential to interactivity. As a result, once the hydration starts, the user can’t interact with the navigation bar, the sidebar, or the post content, until the full tree is hydrated. For navigation, this is especially unfortunate since the user may want to navigate away from this page altogether—but since we’re busy hydrating, we’re keeping them on the current page they no longer care about.