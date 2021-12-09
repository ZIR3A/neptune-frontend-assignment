import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useWeb3Api } from "./web3Provider";
import { useAppDispatch, useAppSelector } from "../src/app/hooks";
import {
  selectEthereum,
  setAddress,
  setBalance,
  setChainId,
} from "../src/features/ethSlice";
import DetailsDialog from "./detailsDialog";

interface IProps {
  open: boolean;
  setOpen: any;
}

declare let window: any;

export default function AlertDialog({ open, setOpen }: IProps) {
  const web3: any = useWeb3Api();
  const dispatch = useAppDispatch();
  const data = useAppSelector(selectEthereum);

  const [isData, setIsData] = React.useState<boolean>(false);

  const handleClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    if (data.address) setIsData(true);
  }, [open]);

  const getEthereum = async () => {
    if (window.ethereum) {
      await window.ethereum.enable();
      await web3.eth
        .getAccounts()
        .then((accounts: any) => {
          dispatch(setAddress(accounts[0]));
          return accounts[0];
        })
        .then((data: any) => {
          web3.eth.getBalance(data).then((value: number) => {
            const credit = web3.utils.fromWei(value, "ether");
            dispatch(setBalance(parseInt(credit)));
          });
        });
      await web3.eth.getChainId().then((id: number) => {
        dispatch(setChainId(id));
      });
      handleClose();
    } else window.location.reload();
  };

  if (isData) return <DetailsDialog />;
  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{ background: "#333" }}
      >
        <DialogTitle id="alert-dialog-title">{"Wallet details"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {
              "Wallet is not connected. Please Click below 'Connect' button below to proceed"
            }
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={getEthereum}
            autoFocus
            color="success"
            variant="contained"
          >
            Connect
          </Button>
          <Button color="error" variant="contained" onClick={handleClose}>
            Cancle
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
