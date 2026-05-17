import Badge from "../common/Badge";
import { getStatusLabel, getStatusVariant } from "../../utils/statusRules";

const StatusBadge = ({ status }) => {
  return (
    <Badge variant={getStatusVariant(status)}>
      {getStatusLabel(status)}
    </Badge>
  );
};

export default StatusBadge;