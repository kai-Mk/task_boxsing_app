type AuthCardProps = {
  title: string;
  children: React.ReactNode;
};

const AuthCard = ({ title, children }: AuthCardProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md max-h-[90vh] overflow-y-auto p-8 bg-white rounded-2xl shadow-lg">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-8">
          {title}
        </h1>
        {children}
      </div>
    </div>
  );
};

export default AuthCard;
