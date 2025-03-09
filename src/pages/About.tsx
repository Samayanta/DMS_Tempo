import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useAuth } from "@/contexts/AuthContext";

const About: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header isLoggedIn={!!user} userName={user?.email || "Guest"} />

      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">About Us</h1>

          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="text-gray-700 mb-4">
              Our Distribution Management System (DMS) is designed to streamline
              the connection between wholesalers and retailers, creating an
              efficient B2B ecosystem that benefits all parties involved in the
              distribution chain.
            </p>
            <p className="text-gray-700">
              We aim to simplify inventory management, order processing, and
              business relationships through our innovative digital platform,
              reducing paperwork and increasing transparency across the supply
              chain.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
            <p className="text-gray-700 mb-4">
              Founded in 2023, our company emerged from the recognition that
              traditional distribution systems were inefficient and often
              created bottlenecks in the supply chain. Our team of industry
              experts and technology innovators came together to develop a
              solution that addresses these challenges.
            </p>
            <p className="text-gray-700">
              Today, we serve hundreds of businesses across multiple industries,
              helping them optimize their distribution operations and grow their
              businesses through our platform.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4">Our Values</h2>
            <ul className="space-y-4">
              <li className="flex">
                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <span className="text-primary font-bold">1</span>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Transparency</h3>
                  <p className="text-gray-700">
                    We believe in clear, honest communication and visibility
                    across all business processes.
                  </p>
                </div>
              </li>
              <li className="flex">
                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <span className="text-primary font-bold">2</span>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Efficiency</h3>
                  <p className="text-gray-700">
                    We continuously optimize our platform to save time and
                    resources for our users.
                  </p>
                </div>
              </li>
              <li className="flex">
                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <span className="text-primary font-bold">3</span>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Innovation</h3>
                  <p className="text-gray-700">
                    We embrace new technologies and ideas to solve complex
                    distribution challenges.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;
