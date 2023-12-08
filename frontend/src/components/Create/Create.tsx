import {
  Alert,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  TextField,
} from "@mui/material";

import { styled } from "@mui/material/styles";
import { FC, useState } from "react";
import { useMutation } from "react-query";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { FileService } from "../../services/file.service";
import { FlatService } from "../../services/flat.service";
import { HouseService } from "../../services/house.service";
import { IFlatCreate } from "../../types/flat.interface";
import { IHouseCreate } from "../../types/house.interface";
import Container from "../Container";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const Create: FC = () => {
  const [commonData, setCommonData] = useState({
    type: "house",
    title: "",
    price: "",
    area: "",
    address: "",
    description: "",
    numberOfPhone: "",
  });
  const [toastText, setToastText] = useState<string>("Success!");
  const [toastType, setToastType] = useState<"success" | "error">("success");
  const id = useTypedSelector((state) => state.user.user?.userId);

  const [rooms, setRooms] = useState<number>(1);
  const [gardenArea, setGardenArea] = useState<number>(0);
  const [hasGarage, setHasGarage] = useState<boolean>(false);
  const [hasGarden, setHasGarden] = useState<boolean>(false);
  const [hasBalcony, setHasBalcony] = useState<boolean>(false);
  const [floor, setFloor] = useState<number>(1);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]); // Step 1
  const [open, setOpen] = useState(false);
  const formData = new FormData();

  const validation = () => {
    const keys = Object.keys(commonData);
    let cond1 = true;
    keys.forEach((item) => {
      if (commonData[item] === "") cond1 = false;
    });
    const cond2 = uploadedFiles.length !== 0;
    const cond3 =
      commonData.type === "house" && hasGarden === true
        ? gardenArea !== 0
        : true;
    return cond1 && cond2 && cond3;
  };

  function handleChange(e: any) {
    const value = e.target.value;
    setCommonData({
      ...commonData,
      [e.target.name]: value,
    });
  }

  const handleClose = () => {
    setOpen(false);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files) {
      const newFiles = Array.from(files);
      setUploadedFiles((prevFiles) => [...prevFiles, ...newFiles]);
    }
  };

  const { mutateAsync: createHouse } = useMutation(
    ["Create house"],
    (data: IHouseCreate) => HouseService.create(data),
    {
      onSuccess: () => {
        setToastText("Success!");
        setToastType("success");
        setOpen(true);
      },
      onError: () => {
        setToastText("All fields are required!");
        setToastType("error");
        setOpen(true);
      },
    }
  );

  const { mutateAsync: createFlat } = useMutation(
    ["Create flat"],
    (data: IFlatCreate) => FlatService.create(data),
    {
      onSuccess: () => {
        setToastText("Success!");
        setToastType("success");
        setOpen(true);
      },
    }
  );

  const { mutateAsync: saveImages } = useMutation(
    ["Upload files"],
    () => FileService.upload(formData),
    {
      onSuccess: (data) => {
        const date = new Date();
        const images: { url: string }[] = [];
        data.data.imageUrls.forEach((item) => images.push({ url: item }));
        if (commonData.type === "house")
          createHouse({
            ...commonData,
            rooms,
            hasGarage,
            hasGarden,
            images,
            createdAt: date.getTime(),
            userId: id,
            gardenArea,
          });
        if (commonData.type === "flat")
          createFlat({
            ...commonData,
            rooms,
            images,
            floor,
            hasBalcony,
            createdAt: date.getTime(),
            userId: id,
          });
      },
    }
  );

  const create = () => {
    if (validation()) {
      uploadedFiles.forEach((file) => {
        formData.append("imageFiles", file);
      });
      saveImages();
    } else {
      setToastText("All fields are required!");
      setToastType("error");
      setOpen(true);
    }
  };

  return (
    <Container>
      <div className="pt-32">
        <div className="">
          <h1 className="font-bold text-3xl">Create</h1>
        </div>
        <div className="">
          <h1 className="text-2xl">Images</h1>
          <div className="mt-3 ">
            {
              <div className="flex gap-4 flex-wrap items-center">
                {uploadedFiles.map((file, index) => (
                  <div key={index}>
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`Uploaded Preview ${index + 1}`}
                      className="w-[200px] h-[200px] rounded-xl"
                    />
                  </div>
                ))}
                <Button
                  component="label"
                  variant="contained"
                  className="h-[100px] w-[100px]"
                >
                  Upload file
                  <VisuallyHiddenInput
                    type="file"
                    multiple
                    onChange={handleFileUpload}
                  />
                </Button>
              </div>
            }
          </div>
        </div>
        <div className="mt-10 flex gap-4 flex-wrap">
          <FormControl>
            <InputLabel id="demo-simple-select-label">Type</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={commonData.type}
              label="Type"
              name={"type"}
              onChange={handleChange}
            >
              <MenuItem value={"house"}>House</MenuItem>
              <MenuItem value={"flat"}>Flat</MenuItem>
            </Select>
          </FormControl>
          <TextField
            id="outlined-controlled"
            label="Title"
            value={commonData.title}
            name={"title"}
            onChange={handleChange}
          />
          <TextField
            id="outlined-controlled"
            label="Price"
            value={commonData.price}
            name={"price"}
            onChange={handleChange}
          />
          <TextField
            id="outlined-controlled"
            label="Area"
            value={commonData.area}
            name={"area"}
            onChange={handleChange}
          />
          <TextField
            id="outlined-controlled"
            label="Rooms"
            value={rooms}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setRooms(+event.target.value);
            }}
          />
          <TextField
            id="outlined-controlled"
            label="Address"
            value={commonData.address}
            name={"address"}
            onChange={handleChange}
          />
          <TextField
            id="outlined-controlled"
            label="Description"
            value={commonData.description}
            name={"description"}
            onChange={handleChange}
          />
          <TextField
            id="outlined-controlled"
            label="Number of phone"
            value={commonData.numberOfPhone}
            name={"numberOfPhone"}
            onChange={handleChange}
          />
          {commonData.type === "house" && (
            <>
              <FormControl className="w-28">
                <InputLabel id="demo-simple-select-label">
                  Has garage
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={hasGarage ? "yes" : "no"}
                  label="Has garage"
                  onChange={(event: any) => {
                    setHasGarage(event.target.value ? true : false);
                  }}
                >
                  <MenuItem value={"yes"}>Yes</MenuItem>
                  <MenuItem value={"no"}>No</MenuItem>
                </Select>
              </FormControl>
              <FormControl className="w-28">
                <InputLabel id="demo-simple-select-label">
                  Has garden
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={hasGarden ? "yes" : "no"}
                  label="Has garden"
                  onChange={(event: any) => {
                    setHasGarden(event.target.value ? true : false);
                  }}
                >
                  <MenuItem value={"yes"}>Yes</MenuItem>
                  <MenuItem value={"no"}>No</MenuItem>
                </Select>
              </FormControl>
              {hasGarden && (
                <TextField
                  id="outlined-controlled"
                  label="Garden area"
                  value={gardenArea}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setGardenArea(+event.target.value);
                  }}
                />
              )}
            </>
          )}
          {commonData.type === "flat" && (
            <>
              <FormControl className="w-28">
                <InputLabel id="demo-simple-select-label">
                  Has balcony
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={hasBalcony ? "yes" : "no"}
                  label="Has garage"
                  onChange={(event: any) => {
                    setHasBalcony(event.target.value ? true : false);
                  }}
                >
                  <MenuItem value={"yes"}>Yes</MenuItem>
                  <MenuItem value={"no"}>No</MenuItem>
                </Select>
              </FormControl>
              <TextField
                id="outlined-controlled"
                label="Floor"
                value={floor}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setFloor(+event.target.value);
                }}
              />
            </>
          )}
        </div>
        <div className="mt-5">
          <Button onClick={create} variant="contained">
            Create
          </Button>
        </div>
      </div>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Alert
          onClose={handleClose}
          severity={toastType}
          sx={{ width: "100%" }}
        >
          {toastText}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Create;
