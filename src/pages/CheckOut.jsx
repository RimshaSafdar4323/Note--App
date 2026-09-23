import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../lib/utils";
import { createCheckoutSession } from "../../backend/controllers/subscriptionController";

export default function CheckOut() {

  const URL = `${BASE_URL}/api/subscription`;

  const handleSubscribe = async () => {
    try {
      const response = await fetch(
        `${URL}/checkout`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      }

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">

      <div className="border rounded-xl p-8 text-center">

        <h1 className="text-3xl font-bold">
          Upgrade Your Notes
        </h1>

        <p className="mt-3">
          You've reached the free limit of 5 notes.
        </p>

        <h2 className="text-2xl font-bold mt-6">
          $5 / Month
        </h2>

        <ul className="mt-4">
          <li>✓ Unlimited Notes</li>
          <li>✓ Create more notes</li>
          <li>✓ Keep all your notes</li>
        </ul>

        <button
          onClick={handleSubscribe}
          className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-lg"
        >
          Subscribe Now
        </button>

      </div>

    </div>
  );
}