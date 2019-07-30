<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Content;

class ControlSizeController extends Controller
{
    public function __construct(Content $content){
        $this->content = $content;
    }

    public function index(Request $request){
        try {
            $list = $this->content::all();
            sleep(2);
            return response()->json(['status'=>true, 'message' => 'Success !','list' => $list]);
        } catch (\Throwable $th) {
            return response()->json(['status'=>false, 'message' => 'Error !']);
        }
    }

    public function create(Request $request){
        sleep(2);

        try {
            $data = $request->all();
            $listNew = [];

            for ($i=0; $i <$data['number'] ; $i++) {
                $this->content = new Content();
                $this->content->value = 0;
                $this->content->save();
                array_push($listNew, $this->content);
            }
            return response()->json(['status'=> true, 'message' => 'Success !','listNew' => $listNew]);
        } catch (\Throwable $th) {
            return $th;
            return response()->json(['status' => false, 'message' => 'Error !']);
        }
    }

    public function down(Request $request){
        try {
            $data = $request->all();
            $number = $this->content::orderBy('id','DESC')->take($data['number'])->delete();;
            return response()->json(['status'=> true, 'message' => 'Success !','number' => $number]);
        } catch (\Throwable $th) {
            return response()->json(['status' => false, 'message' => 'Error !']);
        }
    }

    public function detail(Request $request){
        try {
            $content = $this->content::find($request->id);
            return response()->json(['status'=>true, 'message' => 'Success !', 'content' => $content]);
        } catch (\Throwable $th) {
            return response()->json(['status'=>false,'message' => 'Error !']);
        }
    }

    public function update(Request $request){
        try {
            $data = $request->all();
            $content = $this->content::find($request->id);
            $content->fill($data)->save();
            sleep(2);
            return response()->json(['status' => true, 'message' => 'Success !', 'content' => $content]);
        } catch (\Throwable $th) {
            return \response()->json(['status' => false, 'message' => 'Error !']);
        }
    }

    public function delete(Request $request){
        try {
            $this->content::find($request->id)->delete();
            return response()->json(['status' => true, 'message' => 'Success !']);
        } catch (\Throwable $th) {
            return response()->json(['status' => true, 'message' => 'Error !']);
        }
    }
}
