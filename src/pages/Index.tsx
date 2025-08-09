import ErpLayout from '@/components/layout/ErpLayout';

const IndexPage = () => {
  return (
    <ErpLayout>
      <div className="erp-container">
        <div className="flex flex-col items-center justify-center h-full p-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800">Welcome to Elixir ERP</h1>
          <p className="mt-2 text-lg text-gray-600">
            Please use the sidebar navigation to access different modules.
          </p>
          <p className="mt-4 text-sm text-muted-foreground">
            The <span className="font-semibold text-primary">Service Reception</span> page has been set up for you.
          </p>
        </div>
      </div>
    </ErpLayout>
  );
};

export default IndexPage;