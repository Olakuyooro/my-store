import React from "react";
import { PaystackButton as Paystack } from "react-paystack";

interface PaystackButtonProps {
  amount: number;
  email: string;
  onSuccess: (response: unknown) => void;
  onClose: () => void;
}

const PaystackButton: React.FC<PaystackButtonProps> = ({
  amount,
  email,
  onSuccess,
  onClose,
}) => {
  const publicKey = "pk_test_7ef53c3ee09347192f8a7a6c5773d6951c25fbce";


  const config = {
    reference: new Date().getTime().toString(),
    email,
    amount: amount * 100,
    publicKey,
    // metadata: {
    //   custom_fields: [
    //     {
    //       display_name: "User ID",
    //       variable_name: "user_id",
    //       value: info.id
    //     }
    //   ]
    // }
  };

  const handleSuccess = (response: unknown) => {
    onSuccess(response);
  };

  const handleClose = () => {
    console.log("Transaction closed.");
    onClose();
  };

  return (
    <Paystack className="bg-black p-2 rounded-md text-white"
      {...config}
      onSuccess={handleSuccess}
      onClose={handleClose}
      text="Purchase"
    />
  );
};

export default PaystackButton;
