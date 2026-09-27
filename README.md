# ChoraNami Creative Hub

Below is a production-ready prompt you can paste into Lovable AI. It tells Lovable to build both the frontend and backend with authentication, admin dashboard, booking management, gallery management, and contact forms.

FULL-STACK WEBSITE PROMPT FOR LOVABLE AI

Build a complete full-stack website for ChoraNami, a creative education company based in Kenya that provides art education and creative experiences for children.

The website should be modern, colorful, premium, mobile-friendly, and optimized for SEO.

Use:

React

Next.js

Tailwind CSS

TypeScript

Framer Motion

Supabase (Database + Authentication + Storage)

PostgreSQL

REST API (or Next.js API routes)

Responsive Design

BRAND

Company Name:

ChoraNami

Tagline:

Creative Education for Young Minds

Mission:

To inspire creativity, confidence, imagination, and self-expression in children through engaging art experiences.

FRONTEND REQUIREMENTS

Create the following pages:

Home

Hero section

Large headline

Creative Education for Young Minds

Subheadline

Helping children discover their creativity through engaging art experiences that build confidence, imagination, and lifelong artistic skills.

Buttons

Book a Program

Partner With Us

Large hero image

Animated paint splashes

Floating art icons

Smooth scroll animations

About

Tell the ChoraNami story.

Mention that we believe every child is an artist.

Explain our mission and vision.

Our Programs

Create beautiful service cards.

School Art Clubs

Description

Structured after-school art clubs for schools.

Includes

Drawing

Painting

Crafts

Sculpture

Mixed Media

Features

10 lessons per term

Professional instructors

All materials provided

End-of-term exhibitions

Button

Partner With Us

Homeschool Art Classes

Description

Personalized one-on-one or small group art lessons.

Includes

Drawing

Painting

Colour Theory

Crafts

Mixed Media

Creative Thinking

Button

Book Lessons

ArTogether

Description

Interactive creative experiences for schools, churches, companies and organizations.

Activities

Canvas Painting

Tote Bag Painting

T-shirt Painting

Minimum booking:

50 participants

Button

Book ArTogether

Party Boom

Description

On-site creative entertainment for birthdays and children's events.

Activities

Canvas Painting

Painting Stations

Crafts

Creative Games

Group Art Projects

Perfect for

Birthdays

School Parties

Holiday Events

Family Events

Button

Book Party Boom

Gallery

Create a beautiful masonry gallery.

Categories

School Art Clubs

Homeschool Lessons

Canvas Painting

Birthday Parties

Tote Bag Painting

T-shirt Painting

Children's Artwork

Images should load from the backend database.

Testimonials

Display testimonials in cards.

Admin should be able to add/edit/delete testimonials.

FAQ

Collapsible accordion.

Contact

Include

Booking Form

Google Map

WhatsApp Button

Phone Number

Email

Social Media

GLOBAL UI

Sticky Navigation

Animated buttons

Hover effects

Rounded cards

Large typography

Soft gradients

Color palette

Orange

Yellow

Purple

Turquoise

White

Smooth page transitions

Dark mode support

Loading animations

SEO optimized

BACKEND REQUIREMENTS

Use Supabase.

Create authentication.

Admin login only.

DATABASE

Create these tables.

Programs

id

title

description

image

created_at

Gallery

id

title

category

image_url

created_at

Bookings

id

parent_name

organization

email

phone

service

preferred_date

number_of_participants

message

status

created_at

Testimonials

id

name

position

message

photo

created_at

Contact Messages

id

name

email

phone

subject

message

created_at

ADMIN DASHBOARD

Secure login.

Dashboard statistics.

Number of bookings

Contact messages

Gallery images

Testimonials

Programs

Recent activity

Gallery Management

Upload images

Delete images

Edit captions

Organize by category

Store images in Supabase Storage.

Booking Management

View bookings.

Accept booking.

Decline booking.

Mark as completed.

Search bookings.

Filter by service.

Export bookings as CSV.

Contact Management

Read messages.

Reply status.

Delete.

Archive.

Testimonials

Create

Edit

Delete

Upload photo

Programs

Admin should be able to edit all program descriptions and images without editing code.

BOOKING SYSTEM

Users can book

School Art Clubs

Homeschool Lessons

ArTogether

Party Boom

Booking form should ask

Name

Organization or School

Phone

Email

Service

Preferred Date

Participants

Message

Save into database.

Send confirmation email.

Notify admin.

EMAIL NOTIFICATIONS

Automatically send

Customer confirmation email

Admin booking notification

Admin contact notification

CONTACT FORM

Store messages in database.

Send admin notification.

Show success message.

SEARCH ENGINE OPTIMIZATION

Generate

Meta title

Meta description

Open Graph tags

Structured data

XML sitemap

robots.txt

Optimized image loading

PERFORMANCE

Lazy loading

Image optimization

Code splitting

Caching

Fast page speed

SECURITY

Input validation

Rate limiting

Protected admin routes

Server-side validation

Secure authentication

CSRF protection

EXTRA FEATURES

Floating WhatsApp button

Instagram feed section

Newsletter subscription

Animated counters

Interactive gallery

Image lightbox

Scroll-to-top button

Success notifications

404 page

Custom loading screen

FINAL GOAL

The website should feel like a premium creative education brand similar to modern companies such as Canva, Outschool, and Crayola. It should be visually engaging for parents, schools, and organizations while making it easy to book ChoraNami's services. The admin dashboard should allow non-technical staff to manage all website content, bookings, gallery images, testimonials, and contact messages without writing code. The first three are the logos for C&N... then use the pdf as the color pallete

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/ba4aab51-b37f-42b6-bf3d-90d1d80a6c66).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
