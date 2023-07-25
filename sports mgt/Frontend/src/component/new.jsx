import React from 'react';
import { FaHeart } from 'react-icons/fa';
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
  Button,
  Input,
  Textarea,
} from "@material-tailwind/react";
import { Link } from 'react-router-dom';

const HomePage = () => {
  const backgroundImage = 'url("https://www.monaco.edu/app/uploads/sites/4/2021/07/Sports_Management.jpg")';

  return (
    <div className="bg-gray-100">
      <div
        className="flex flex-col items-center justify-center min-h-screen bg-gray-100 relative"
        style={{ backgroundImage: backgroundImage, backgroundSize: 'cover' }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <h1 className="text-4xl font-bold mb-4 text-white z-10">Sports Management System</h1>
        <p className="text-lg text-gray-300 mb-8 z-10">
          Welcome to our platform for managing sports events, tournaments, and teams.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 z-10">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-2">Upcoming Tournaments</h2>
            <p className="text-gray-600">
              Explore and register for upcoming tournaments in various sports.
            </p>
            <Link
              to="/ShowTournaments"
              className="mt-4 inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
            >
              View Tournaments
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-2">View Our history</h2>
            <p className="text-gray-600">
              Go through our past and facilities
            </p>
            <Link
              to="/about"
              className="mt-4 inline-block bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded"
            >
              Click here
            </Link>
          </div>
        </div>
      </div>

      <div className="h-screen px-4 pb-20 pt-4">
        <section className="bg-gray-50">
          <div className="container mx-auto h-screen">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {/* Render your feature cards here */}
            </div>
            <div className="mt-16 flex flex-wrap items-center">
              <div className="mx-auto w-full px-4 md:w-5/12">
                <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-white p-3 text-center shadow-lg">
                  <FaHeart className="h-6 w-6 text-blue-gray-900" />
                </div>
                <Typography
                  variant="h3"
                  className="mb-3 font-bold"
                  color="blue-gray"
                >
                  Working with us is a pleasure
                </Typography>
                <Typography className="mb-8 font-normal text-blue-gray-500">
                  Our user-friendly interface and powerful features make it easy to organize and coordinate sports activities, ensuring smooth communication, efficient scheduling, and seamless collaboration.
                  Join our growing community of sports enthusiasts and experience the joy of sports management like never before!
                  <br />
                  <br />
                  Discover and register for upcoming tournaments in various sports, from soccer to basketball and more.
                  Create and manage teams for different sports and events, bringing together talented individuals to compete and achieve greatness.
                </Typography>
                <Button variant="outlined">Read More</Button>
              </div>
              <div className="mx-auto mt-24 flex w-full justify-center px-4 md:w-4/12 lg:mt-0">
                <Card className="shadow-lg shadow-gray-500/10 rounded-lg">
                  <CardHeader className="relative h-56">
                    <img
                      alt="Card Image"
                      src="https://images.indianexpress.com/2019/07/untitled-design-6-4.jpg"
                      className="h-full w-full  px-8 py-4 object-cover rounded-lg"
                    />
                  </CardHeader>
                  <CardBody>
                    <Typography
                      variant="h5"
                      color="blue-gray"
                      className="mb-3 font-bold"
                    >
                      Top Notch Services
                    </Typography>
                    <Typography className="font-normal text-blue-gray-500">
                      The Arctic Ocean freezes every winter and much of the
                      sea-ice then thaws every summer, and that process will
                      continue whatever happens.
                    </Typography>
                  </CardBody>
                </Card>
              </div>
            </div>

            <div className="flex justify-start pt-14 pl-28">
              <div className="w-full md:w-4/12 pb-80">
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h2 className="text-xl font-semibold mb-2">Book a slot</h2>
                  <p className="text-gray-600">Explore the facilities</p>
                  <Link
                    to="/turfs"
                    className="mt-4 inline-block bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded"
                  >
                    Click here
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </section>
      </div>

    </div>
  );
};

export default HomePage;