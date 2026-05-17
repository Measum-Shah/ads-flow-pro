import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import ErrorMessage from "../../components/common/ErrorMessage";
import EmptyState from "../../components/common/EmptyState";
import DashboardPageHeader from "../../components/dashboard/DashboardPageHeader";
import PackageCard from "../../components/dashboard/PackageCard";
import CardSkeleton from "../../components/loaders/CardSkeleton";

import { selectAdPackage } from "../../api/client.api";
import { usePublicData } from "../../hooks/usePublicData";
import { getApiError } from "../../utils/errorHandler";

const SelectPackage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { packages, publicDataLoading } = usePublicData();

  const [selectedPackageId, setSelectedPackageId] = useState("");
  const [loadingPackageId, setLoadingPackageId] = useState("");
  const [error, setError] = useState("");

  const handleSelectPackage = async (packageData) => {
    const packageId = packageData?._id || packageData?.id;

    if (!packageId) {
      setError("Invalid package selected.");
      return;
    }

    setError("");
    setSelectedPackageId(packageId);
    setLoadingPackageId(packageId);

    try {
      await selectAdPackage(id, packageId);
      navigate(`/client/ads/${id}/payment`);
    } catch (err) {
      setError(getApiError(err, "Failed to select package."));
    } finally {
      setLoadingPackageId("");
    }
  };

  return (
    <div>
      <DashboardPageHeader
        badge="Package Selection"
        title="Choose Ad Package"
        description="Select a package for your approved advertisement. After selecting a package, you can submit your payment proof."
      />

      {error && (
        <div className="mb-5">
          <ErrorMessage message={error} />
        </div>
      )}

      {publicDataLoading ? (
        <CardSkeleton count={3} />
      ) : packages.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {packages.map((pkg) => {
            const packageId = pkg?._id || pkg?.id;

            return (
              <PackageCard
                key={packageId}
                packageData={pkg}
                selected={selectedPackageId === packageId}
                loading={loadingPackageId === packageId}
                onSelect={handleSelectPackage}
              />
            );
          })}
        </div>
      ) : (
        <EmptyState
          title="No packages available"
          description="No advertising packages are available right now."
        />
      )}
    </div>
  );
};

export default SelectPackage;