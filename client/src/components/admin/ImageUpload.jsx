import { Input } from "../ui/input";
import { Label } from "../ui/label";

const ImageUpload = () => {
    return (
        <div className="w-full max-w-md mx-auto" >
            <Label className="text-lg font-semibold mb-2 mt-2 block">Upload Image</Label>
            <Input type="file"  className="hidden"/>
        </div>
    );
};

export default ImageUpload;