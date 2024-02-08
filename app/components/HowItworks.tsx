import React from "react";
import { FaSignInAlt, FaUserPlus, FaBriefcase } from "react-icons/fa";

const HowItWorksStep = ({ icon, title, description }: any) => (
  <div className="flex flex-col items-center p-4 transition-shadow dark:bg-gray-900 hover:shadow-lg rounded-lg">
    <div className="mb-4 text-primary-500">{icon}</div>
    <h3 className="text-lg font-semibold">{title}</h3>
    <p className="text-sm text-gray-600 text-center">{description}</p>
  </div>
);

const HowItWorks = () => {
  return (
    <main className=" bg-white dark:bg-gray-800">
      <section className="py-12 max-w-7xl mx-auto">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-3xl font-bold  mb-10">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <HowItWorksStep
              icon={<FaSignInAlt size={48} className="text-blue-600" />}
              title="Login"
              description="Access your account or create a new one."
            />
            <HowItWorksStep
              icon={<FaUserPlus size={48} className="text-green-600" />}
              title="Register"
              description="Sign up to create your profile."
            />
            <HowItWorksStep
              icon={<FaBriefcase size={48} className="text-yellow-600" />}
              title="Post/Apply"
              description="Post a job or apply for one."
            />
          </div>
        </div>
      </section>
    </main>
  );
};

export default HowItWorks;
