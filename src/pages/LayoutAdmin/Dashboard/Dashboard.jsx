import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

export const Dashboard = () => {
  return (
    <div className=" w-full p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Admin Dashboard</CardTitle>
          <p className="text-sm text-muted-foreground">
            Welcome to the admin dashboard. Here you can manage all the
            functionalities of the application.
          </p>
        </CardHeader>
        <CardContent></CardContent>
      </Card>
    </div>
  );
};
