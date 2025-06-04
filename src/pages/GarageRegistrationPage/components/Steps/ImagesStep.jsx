import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { X, Upload, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRef } from "react";

export function ImagesStep({ files, onFileChange, onRemoveFile }) {
  const inputRef = useRef(null);

  return (
    <div className="space-y-6">
      <div
        className="text-center space-y-2"
        onClick={() => inputRef.current.click()}
      >
        <ImageIcon className="w-12 h-12 mx-auto text-muted-foreground" />
        <h3 className="text-lg font-medium">Showcase Your Garage</h3>
        <p className="text-muted-foreground">
          Upload photos of your garage interior, equipment, and workspace to
          attract more customers
        </p>
      </div>

      <Card>
        <CardContent className="p-6 space-y-4">
          {files.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {files.map((file) => (
                <div key={file.name} className="relative group">
                  <div className="aspect-square overflow-hidden rounded-lg border">
                    <img
                      src={URL.createObjectURL(file) || "/placeholder.svg"}
                      alt={file.name}
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute -top-2 -right-2 w-6 h-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => onRemoveFile(file)}
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div
              className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center"
              onClick={() => inputRef.current.click()}
            >
              <Upload className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground mb-2">
                Drag and drop images here, or click to browse
              </p>
              <p className="text-sm text-muted-foreground">
                Supported formats: JPG, PNG, GIF (Max 5MB each)
              </p>
            </div>
          )}

          <div className="space-y-2">
            <Input
              ref={inputRef}
              id="file"
              type="file"
              multiple
              accept="image/*"
              onChange={onFileChange}
              className="cursor-pointer hidden"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
