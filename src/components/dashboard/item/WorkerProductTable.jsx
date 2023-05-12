import {
  Avatar,
  Box,
  Card,
  Icon,
  IconButton,
  MenuItem,
  Select,
  styled,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  useTheme,
} from "@mui/material";
import { Paragraph } from "app/components/Typography";
import translate from "components/general/translate";

const CardHeader = styled(Box)(() => ({
  display: "flex",
  paddingLeft: "24px",
  paddingRight: "24px",
  marginBottom: "12px",
  alignItems: "center",
  justifyContent: "space-between",
}));

const Title = styled("span")(() => ({
  fontSize: "1rem",
  fontWeight: "500",
  textTransform: "capitalize",
}));

const ProductTable = styled(Table)(() => ({
  minWidth: 400,
  whiteSpace: "pre",
  "& small": {
    width: 50,
    height: 15,
    borderRadius: 500,
    boxShadow: "0 0 2px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.24)",
  },
  "& td": { borderBottom: "none" },
  "& td:first-of-type": { paddingLeft: "16px !important" },
}));

const Small = styled("small")(({ bgcolor }) => ({
  width: 50,
  height: 15,
  color: "#fff",
  padding: "2px 8px",
  borderRadius: "4px",
  overflow: "hidden",
  background: bgcolor,
  boxShadow: "0 0 2px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.24)",
}));

const TopSellingTable = ({ data }) => {
  const { palette } = useTheme();
  const bgError = palette.error.main;
  const bgPrimary = palette.primary.main;
  const bgSecondary = palette.secondary.main;

  return (
    <Card elevation={3} sx={{ pt: "20px", mb: 3 }}>
      <CardHeader>
        <Title>{translate("Product List")}</Title>
      </CardHeader>

      <Box overflow="auto">
        <ProductTable>
          <TableHead>
            <TableRow>
              <TableCell sx={{ px: 3 }} colSpan={4}>
                {translate("Product Name")}
              </TableCell>
              <TableCell sx={{ px: 0 }} colSpan={2}>
                {translate("Stock Status")}
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {data.map((product, index) => (
              <TableRow key={index} hover>
                <TableCell
                  colSpan={4}
                  align="left"
                  sx={{ px: 0, textTransform: "capitalize" }}
                >
                  <Box display="flex" alignItems="center">
                    <Paragraph sx={{ m: 0, ml: 4 }}>
                      {product?.company_inventory?.product?.name}
                    </Paragraph>
                  </Box>
                </TableCell>

                <TableCell sx={{ px: 0 }} align="left" colSpan={2}>
                  {product.stock ? (
                    product.stock < 20 ? (
                      <Small bgcolor={bgSecondary}>
                        {product.stock} {translate("Stock")}
                      </Small>
                    ) : (
                      <Small bgcolor={bgPrimary}>
                        {product.stock} {translate("Stock")}
                      </Small>
                    )
                  ) : (
                    <Small bgcolor={bgError}>{translate("out of Stock")}</Small>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </ProductTable>
      </Box>
    </Card>
  );
};

export default TopSellingTable;
