import { useState } from "react";
import { ChevronDown, X } from "lucide-react";

const courses = [
  {
    name: "HTML",
    topics: [
      {
        title: "Tags",
        description: `
          <strong>What are HTML Tags?</strong><br>
          HTML (HyperText Markup Language) tags are the building blocks of web pages. They are used to define and structure content on a webpage. Tags are enclosed in angle brackets (&lt; &gt;) and usually come in pairs: an opening tag and a closing tag.

          <br><br>
          <strong>Structure of an HTML Tag:</strong><br>
          - <strong>Opening Tag:</strong> &lt;tagname&gt;<br>
          - <strong>Closing Tag:</strong> &lt;/tagname&gt;<br>
          - <strong>Content:</strong> The text or other elements between the opening and closing tags.

          <br><br>
          <strong>Example of an HTML Tag:</strong><br>
          <code>&lt;p&gt;This is a paragraph.&lt;/p&gt;</code>

          <br><br>
          <strong>Common HTML Tags:</strong><br>
          - <strong>Headings:</strong> &lt;h1&gt; to &lt;h6&gt; for different levels of headings.<br>
          - <strong>Paragraph:</strong> &lt;p&gt; for defining paragraphs.<br>
          - <strong>Links:</strong> &lt;a&gt; for creating hyperlinks.<br>
          - <strong>Images:</strong> &lt;img&gt; for embedding images.<br>
          - <strong>Lists:</strong> &lt;ul&gt;, &lt;ol&gt;, and &lt;li&gt; for unordered and ordered lists.<br>
          - <strong>Divisions:</strong> &lt;div&gt; for grouping content.<br>
          - <strong>Semantic Tags:</strong> &lt;header&gt;, &lt;footer&gt;, &lt;section&gt;, &lt;article&gt;, &lt;nav&gt;, etc., for better structure and accessibility.

          <br><br>
          <strong>Best Practices:</strong><br>
          - Always close your tags properly.<br>
          - Use semantic tags to improve accessibility and SEO.<br>
          - Avoid using deprecated tags like &lt;font&gt; or &lt;center&gt;.
        `,
      },
      {
        title: "Forms",
        description: `
          <strong>What are HTML Forms?</strong><br>
          HTML forms are used to collect user input on a webpage. They are essential for tasks like user registration, login, search, feedback, and payment processing.

          <br><br>
          <strong>Basic Structure of an HTML Form:</strong><br>
          <code>
            &lt;form action="/submit" method="POST"&gt;<br>
            &nbsp;&nbsp;&lt;label for="username"&gt;Username:&lt;/label&gt;<br>
            &nbsp;&nbsp;&lt;input type="text" id="username" name="username" required&gt;<br>
            &nbsp;&nbsp;&lt;button type="submit"&gt;Submit&lt;/button&gt;<br>
            &lt;/form&gt;
          </code>

          <br><br>
          <strong>Key Components of a Form:</strong><br>
          - <strong>&lt;form&gt;:</strong> The container for all form elements.<br>
          - <strong>&lt;input&gt;:</strong> Used for text, password, email, number, checkbox, radio, file, and more.<br>
          - <strong>&lt;label&gt;:</strong> Describes the purpose of an input field.<br>
          - <strong>&lt;textarea&gt;:</strong> For multi-line text input.<br>
          - <strong>&lt;select&gt; and &lt;option&gt;:</strong> For dropdown menus.<br>
          - <strong>&lt;button&gt;:</strong> For submit and reset actions.<br>
          - <strong>Validation:</strong> Use attributes like <code>required</code>, <code>pattern</code>, and <code>min/max</code> for client-side validation.

          <br><br>
          <strong>Example of a Complete Form:</strong><br>
          <code>
            &lt;form action="/submit" method="POST"&gt;<br>
            &nbsp;&nbsp;&lt;label for="name"&gt;Name:&lt;/label&gt;<br>
            &nbsp;&nbsp;&lt;input type="text" id="name" name="name" required&gt;<br>
            &nbsp;&nbsp;&lt;label for="email"&gt;Email:&lt;/label&gt;<br>
            &nbsp;&nbsp;&lt;input type="email" id="email" name="email" required&gt;<br>
            &nbsp;&nbsp;&lt;label for="password"&gt;Password:&lt;/label&gt;<br>
            &nbsp;&nbsp;&lt;input type="password" id="password" name="password" required&gt;<br>
            &nbsp;&nbsp;&lt;button type="submit"&gt;Submit&lt;/button&gt;<br>
            &lt;/form&gt;
          </code>

          <br><br>
          <strong>Best Practices:</strong><br>
          - Use proper labels for accessibility.<br>
          - Validate inputs both on the client and server sides.<br>
          - Use semantic HTML5 input types like <code>email</code>, <code>date</code>, and <code>number</code>.
        `,
      },
      {
        title: "Tables",
        description: `
          <strong>What are HTML Tables?</strong><br>
          HTML tables are used to organize and display data in rows and columns. They are created using the &lt;table&gt;, &lt;tr&gt;, &lt;td&gt;, and &lt;th&gt; tags.

          <br><br>
          <strong>Basic Structure of an HTML Table:</strong><br>
          <code>
            &lt;table&gt;<br>
            &nbsp;&nbsp;&lt;tr&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;th&gt;Header 1&lt;/th&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;th&gt;Header 2&lt;/th&gt;<br>
            &nbsp;&nbsp;&lt;/tr&gt;<br>
            &nbsp;&nbsp;&lt;tr&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;td&gt;Data 1&lt;/td&gt;<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;td&gt;Data 2&lt;/td&gt;<br>
            &nbsp;&nbsp;&lt;/tr&gt;<br>
            &lt;/table&gt;
          </code>

          <br><br>
          <strong>Key Components of a Table:</strong><br>
          - <strong>&lt;table&gt;:</strong> The container for the table.<br>
          - <strong>&lt;tr&gt;:</strong> Defines a table row.<br>
          - <strong>&lt;td&gt;:</strong> Defines a table cell.<br>
          - <strong>&lt;th&gt;:</strong> Defines a table header cell.<br>
          - <strong>&lt;caption&gt;:</strong> Adds a caption to the table.<br>
          - <strong>&lt;thead&gt;, &lt;tbody&gt;, &lt;tfoot&gt;:</strong> Group table content for better structure.

          <br><br>
          <strong>Best Practices:</strong><br>
          - Use tables only for tabular data, not for layout.<br>
          - Add captions and headers for accessibility.<br>
          - Use CSS to style tables instead of deprecated attributes like <code>border</code>.
        `,
      },
    ],
  },
  {
    name: "CSS",
    topics: [
      {
        title: "Selectors",
        description: `
          <strong>What are CSS Selectors?</strong><br>
          CSS selectors are patterns used to select and style HTML elements. They allow you to target specific elements or groups of elements on a webpage.

          <br><br>
          <strong>Types of CSS Selectors:</strong><br>
          - <strong>Element Selector:</strong> Targets HTML elements by their tag name (e.g., <code>p</code>, <code>h1</code>).<br>
          - <strong>Class Selector:</strong> Targets elements with a specific class (e.g., <code>.my-class</code>).<br>
          - <strong>ID Selector:</strong> Targets a single element with a specific ID (e.g., <code>#my-id</code>).<br>
          - <strong>Attribute Selector:</strong> Targets elements with a specific attribute (e.g., <code>[type="text"]</code>).<br>
          - <strong>Pseudo-classes:</strong> Targets elements in a specific state (e.g., <code>:hover</code>, <code>:nth-child</code>).

          <br><br>
          <strong>Example:</strong><br>
          <code>
            p { color: blue; }<br>
            .my-class { font-size: 16px; }<br>
            #my-id { background-color: yellow; }<br>
            [type="text"] { border: 1px solid #ccc; }<br>
            a:hover { text-decoration: underline; }
          </code>

          <br><br>
          <strong>Best Practices:</strong><br>
          - Use classes for reusable styles.<br>
          - Avoid using IDs for styling.<br>
          - Keep selectors simple and specific.
        `,
      },
      {
        title: "Flexbox",
        description: `
          <strong>What is Flexbox?</strong><br>
          Flexbox is a CSS layout model designed for creating responsive and flexible layouts. It allows you to align and distribute space among items in a container, even when their size is unknown or dynamic.

          <br><br>
          <strong>Key Concepts:</strong><br>
          - <strong>Flex Container:</strong> The parent element with <code>display: flex</code>.<br>
          - <strong>Flex Items:</strong> The child elements of the flex container.<br>
          - <strong>Main Axis:</strong> The primary axis along which items are laid out (horizontal by default).<br>
          - <strong>Cross Axis:</strong> The perpendicular axis to the main axis.

          <br><br>
          <strong>Common Properties:</strong><br>
          - <code>justify-content</code>: Aligns items along the main axis.<br>
          - <code>align-items</code>: Aligns items along the cross axis.<br>
          - <code>flex-direction</code>: Defines the direction of the main axis.<br>
          - <code>flex-wrap</code>: Controls whether items wrap to the next line.<br>
          - <code>flex-grow</code>, <code>flex-shrink</code>, <code>flex-basis</code>: Controls how items grow, shrink, and their initial size.

          <br><br>
          <strong>Example:</strong><br>
          <code>
            .container {<br>
            &nbsp;&nbsp;display: flex;<br>
            &nbsp;&nbsp;justify-content: space-between;<br>
            &nbsp;&nbsp;align-items: center;<br>
            }<br>
            .item {<br>
            &nbsp;&nbsp;flex: 1;<br>
            }
          </code>

          <br><br>
          <strong>Best Practices:</strong><br>
          - Use Flexbox for one-dimensional layouts.<br>
          - Combine with CSS Grid for complex layouts.<br>
          - Use shorthand properties like <code>flex</code> for simplicity.
        `,
      },
      {
        title: "Grid",
        description: `
          <strong>What is CSS Grid?</strong><br>
          CSS Grid is a two-dimensional layout system that allows you to create complex and responsive layouts. It works by dividing a container into rows and columns, and placing items into the grid cells.

          <br><br>
          <strong>Key Concepts:</strong><br>
          - <strong>Grid Container:</strong> The parent element with <code>display: grid</code>.<br>
          - <strong>Grid Items:</strong> The child elements of the grid container.<br>
          - <strong>Grid Lines:</strong> The lines that define the grid's rows and columns.<br>
          - <strong>Grid Tracks:</strong> The rows and columns of the grid.<br>
          - <strong>Grid Areas:</strong> Named sections of the grid.

          <br><br>
          <strong>Common Properties:</strong><br>
          - <code>grid-template-columns</code>: Defines the columns of the grid.<br>
          - <code>grid-template-rows</code>: Defines the rows of the grid.<br>
          - <code>grid-gap</code>: Sets the gap between rows and columns.<br>
          - <code>grid-area</code>: Places items into specific grid areas.<br>
          - <code>grid-column</code>, <code>grid-row</code>: Positions items using grid lines.

          <br><br>
          <strong>Example:</strong><br>
          <code>
            .container {<br>
            &nbsp;&nbsp;display: grid;<br>
            &nbsp;&nbsp;grid-template-columns: 1fr 1fr 1fr;<br>
            &nbsp;&nbsp;grid-gap: 10px;<br>
            }<br>
            .item {<br>
            &nbsp;&nbsp;grid-column: 1 / 3;<br>
            }
          </code>

          <br><br>
          <strong>Best Practices:</strong><br>
          - Use Grid for two-dimensional layouts.<br>
          - Combine with Flexbox for nested layouts.<br>
          - Use <code>fr</code> units for flexible sizing.
        `,
      },
    ],
  },
  {
    name: "JavaScript",
    topics: [
      {
        title: "ES6",
        description: `
          <strong>What is ES6?</strong><br>
          ES6 (ECMAScript 2015) is a major update to JavaScript that introduced modern features and syntax improvements. It is widely used in modern web development.

          <br><br>
          <strong>Key Features:</strong><br>
          - <strong>let and const:</strong> Block-scoped variable declarations.<br>
          - <strong>Arrow Functions:</strong> Shorter syntax for writing functions.<br>
          - <strong>Template Literals:</strong> Allows embedding expressions in strings.<br>
          - <strong>Destructuring:</strong> Extracts values from arrays or objects.<br>
          - <strong>Modules:</strong> Allows organizing code into reusable modules.<br>
          - <strong>Classes:</strong> Introduces class-based object-oriented programming.

          <br><br>
          <strong>Example:</strong><br>
          <code>
            // Arrow Function<br>
            const add = (a, b) => a + b;<br>
            // Destructuring<br>
            const [x, y] = [1, 2];<br>
            const { name, age } = person;
          </code>

          <br><br>
          <strong>Best Practices:</strong><br>
          - Use <code>const</code> for variables that don't change.<br>
          - Use arrow functions for concise syntax.<br>
          - Use template literals for dynamic strings.
        `,
      },
      {
        title: "DOM",
        description: `
          <strong>What is the DOM?</strong><br>
          The DOM (Document Object Model) is a programming interface for HTML and XML documents. It represents the structure of a document as a tree of objects, allowing JavaScript to manipulate the content, structure, and style of a webpage.

          <br><br>
          <strong>Key Concepts:</strong><br>
          - <strong>Document:</strong> The root of the DOM tree.<br>
          - <strong>Elements:</strong> The nodes in the DOM tree representing HTML elements.<br>
          - <strong>Nodes:</strong> The individual components of the DOM tree (elements, text, comments, etc.).<br>
          - <strong>Methods:</strong> Functions like <code>getElementById</code>, <code>querySelector</code>, and <code>addEventListener</code> for interacting with the DOM.

          <br><br>
          <strong>Example:</strong><br>
          <code>
            // Select an element<br>
            const element = document.getElementById("my-element");<br>
            // Change content<br>
            element.textContent = "Hello, World!";<br>
            // Add an event listener<br>
            element.addEventListener("click", () => {<br>
            &nbsp;&nbsp;alert("Element clicked!");<br>
            });
          </code>

          <br><br>
          <strong>Best Practices:</strong><br>
          - Use <code>querySelector</code> and <code>querySelectorAll</code> for flexible element selection.<br>
          - Minimize direct DOM manipulation for performance.<br>
          - Use event delegation for dynamic content.
        `,
      },
      {
        title: "Events",
        description: `
          <strong>What are JavaScript Events?</strong><br>
          JavaScript events are actions or occurrences that happen in the browser, such as clicks, keypresses, or page loads. Event handlers are used to execute code in response to these events.

          <br><br>
          <strong>Key Concepts:</strong><br>
          - <strong>Event Types:</strong> Common events include <code>click</code>, <code>mouseover</code>, <code>keydown</code>, and <code>load</code>.<br>
          - <strong>Event Listeners:</strong> Functions that listen for and respond to events.<br>
          - <strong>Event Object:</strong> Contains information about the event (e.g., target, type).<br>
          - <strong>Event Propagation:</strong> The process of events bubbling up or capturing down the DOM tree.

          <br><br>
          <strong>Example:</strong><br>
          <code>
            // Add an event listener<br>
            document.getElementById("my-button").addEventListener("click", (event) => {<br>
            &nbsp;&nbsp;console.log("Button clicked!");<br>
            &nbsp;&nbsp;console.log(event.target);<br>
            });
          </code>

          <br><br>
          <strong>Best Practices:</strong><br>
          - Use event delegation for dynamic content.<br>
          - Avoid inline event handlers.<br>
          - Remove event listeners when no longer needed.
        `,
      },
    ],
  }, // Added missing closing brace for the JavaScript object
];

const CourseDropdown = () => {
  const [selectedTopic, setSelectedTopic] = useState(null);

  const openModal = (topic) => {
    setSelectedTopic(topic);
  };

  const closeModal = () => {
    setSelectedTopic(null);
  };

  return (
    <div className="absolute top-full left-0 mt-2 bg-white shadow-md w-80 rounded-md p-3 border border-gray-200 z-50">
      {courses.map((course, index) => (
        <div key={index} className="mb-3">
          <p className="font-semibold text-blue-700 text-lg border-b pb-2">
            {course.name}
          </p>
          <ul className="mt-2 space-y-2">
            {course.topics.map((topic, i) => (
              <li key={i} className="cursor-pointer">
                <div
                  className="flex justify-between items-center p-2 bg-gray-100 rounded-md hover:bg-blue-100 transition duration-200"
                  onClick={() => openModal(topic)}
                  role="button"
                  tabIndex={0}
                  aria-label={`Open ${topic.title} description`}
                >
                  <span className="text-gray-700">{topic.title}</span>
                  <ChevronDown size={18} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}

      {/* Modal Popup */}
      {selectedTopic && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-100/80 backdrop-blur-sm z-50">
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-lg shadow-2xl w-[1200px] max-h-[80vh] overflow-y-auto relative">
            {/* Background Design: Coding Symbols */}
            <div className="absolute inset-0 overflow-hidden rounded-lg">
              {/* Blurred Shapes */}
              <div className="absolute -top-20 -left-20 w-96 h-96 bg-blue-200 rounded-full opacity-20 blur-3xl"></div>
              <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-purple-200 rounded-full opacity-20 blur-3xl"></div>
              
              {/* Coding Pattern */}
              <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/coding-pattern.svg')] bg-repeat opacity-10"></div>
            </div>

            {/* Modal Content */}
            <div className="relative z-10">
              {/* Header */}
              <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                <h2 className="text-2xl font-semibold text-blue-700">
                  {selectedTopic.title}
                </h2>
                <button
                  onClick={closeModal}
                  aria-label="Close modal"
                  className="p-2 hover:bg-gray-100 rounded-full transition duration-200"
                >
                  <X size={28} className="text-gray-500 hover:text-gray-800" />
                </button>
              </div>

              {/* Description */}
              <p
                className="mt-4 text-gray-700 leading-7"
                dangerouslySetInnerHTML={{ __html: selectedTopic.description }}
              />

              {/* Close Button */}
              <button
                className="mt-6 w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition duration-200"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseDropdown;