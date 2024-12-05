import { PageRoutes } from "@/constants/page-routes";
import { useMetadata } from "vike-metadata-solid";

export default function Page() {
  useMetadata({});

  return (
    <>
      <h2>What is Lucia Kit?</h2>
      <p>
        A semi-opinionated, framework-agnostic way to implement session auth based on the Lucia book
        by Pilcrowonpaper.
      </p>
      <p>Not a library, not a framework, just a tool. No extra dependency. Own your auth.</p>
      LuciaKit is an interactive roll-your-own auth tool based on the Lucia book. With some
      structural opinions.
      <p>
        This landing page is mainly to educate you. After this, you'll be able to set up your auth
        in literally 5 minutes thanks to this tool.
      </p>
      <p>Lucia is a book by Pilcrowonpaper as a guide to make session Auth.</p>
      <a href={PageRoutes.App} class="">
        Go to App
      </a>
      <p>
        Using the Lucia book, I made a very agnostic template that you can mix and match with your
        TypeScript technologies so you can make an auth that fits your stack.
      </p>
      <br />
      <h2>What is Auth?</h2>
      <p>
        In order to achieve this "agnosticism", we can pretty much slice our backend into these 4
        things.
      </p>
      <ol>
        <li>Data-Access Objects (DAO) - Basically helpers that query/mutate the database.</li>
        <li>
          Lib: Session Management API (This was the old Lucia library, that you will now be building
          from scratch, which is actually a lot easier than you think!)
        </li>
        <li>
          <div>API Controllers (Endpoints)</div>
          <ul>
            <li>List of all users</li>
            <li>Current User /auth</li>
            <li>Logout /auth/logout</li>
            <li>Auth Strategies</li>
            <ul>
              <li>OAuth</li>
              <ul>
                <li></li>
              </ul>
              <li>Email Password</li>
              <li>Magic Link</li>
              <li>Sign Up /auth/sign</li>
              <li>Sign In /auth/sign</li>
            </ul>
          </ul>
        </li>
        <li>API Services - Plain agnostic functions that abstract the logic of each endpoint.</li>
      </ol>
      <p>
        Believe it or not, this is <strong>auth</strong>. Plain and simple. That third-party auth
        providers are abstracting away from you.
      </p>
      <p>Stop being a baby and roll your own.</p>
      <div>
        <br />
      </div>
      <h2>Fit it to your stack!</h2>
      <ul>
        <li>Pick a database.</li>
        <li>Pick ORM or Plain DB Client</li>
        <li>Pick a server framework.</li>
        <li>(Optional) Pick a frontend framework.</li>
        <li>
          (Carlo's notes) Be able to: Toggle comments, role-based auth, email client lib, env inside
          `config.private.ts`.
        </li>
      </ul>
      <br />
      <h2>Why did you make this?</h2>
      <p>
        I wanted a headless for Session Auth, like how Shadcn-UI is for Accessible UI components.
      </p>
      <p>
        Session Auth is also the simplest type of auth that probably fits 90% of apps usecases out
        there. So forget, JWTs and Refresh Tokens for now.
      </p>
      <p>
        For library-users: Having a ready-made library is convenient, but once you want something
        custom, it becomes a limitation. When you own your code, you can edit it without waiting for
        a maintainer to support your usecase.
      </p>
      <p>
        For library-authors: Maintaining a bunch of library code, adapters, abstractions just to fit
        everyone's usecase is a hassle, and can get outdated pretty quick. It's why Lucia stopped
        being a library.
      </p>
      <p>
        The beauty of not making auth a library is also that we don't need to create adapters and
        install adapter dependencies. The implementations will be very straight to the point, and
        easy to edit.
      </p>
    </>
  );
}
