import ErpLayout from '@/components/layout/ErpLayout';

const IndexPage = () => {
  return (
    <ErpLayout>
      <div className="erp-container">
        <div className="flex flex-col items-center justify-center h-full">
          <h1 className="text-2xl font-bold">Ready for your files</h1>
          <p className="text-muted-foreground">Please provide the new files for the application.</p>
        </div>
      </div>
    </ErpLayout>
  );
};

export default IndexPage;