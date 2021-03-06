var Xtofix;
var Ytofix;
var oldxscale = 0;
var oldyscale = 0;

function filePrepInit() {


  useOffset = $('#useOffset').val()
  if ( useOffset.indexOf('Disable') == 0 ) {
      $('#inflateFeature').hide();
  }



  $( "#scaleFactor" ).change(function() {
    if ( typeof(object) != 'undefined' ) {
      scene.remove(object);
    }
    var hScale = ($(this).val() / 100);
    console.log('Scaling to ', hScale);
    fileParentGroup.scale.x = hScale;
    fileParentGroup.scale.y = hScale;
    fileParentGroup.updateMatrix();
    fileParentGroup.updateMatrixWorld();
    putFileObjectAtZero();
    currentWorld();

  });

  $( "#xpos" ).change(function() {
    if ( typeof(object) != 'undefined' ) {
      scene.remove(object);
    }
    var hPosX = $(this).val();
    console.log('Moving X from ', fileObject.position.x   ,   ' to ',  (hPosX - (laserxmax / 2)) );
    fileParentGroup.position.x = (hPosX - (laserxmax / 2));
    currentWorld();
  });

  $( "#ypos" ).change(function() {
    if ( typeof(object) != 'undefined' ) {
      scene.remove(object);
    }
    var hPosY = $(this).val();
    console.log('Moving X from ', fileObject.position.y   ,   ' to ',  (hPosY - (laserymax / 2)) );
    fileParentGroup.position.y = (hPosY - (laserymax / 2));
    currentWorld();
  });

  $('#removeInflateGrp').on('click', function() {
    scene.remove(inflateGrp);
  });

}

function resetView() {
  if ( typeof(object) != 'undefined' ) {
    viewExtents(object);
  } else if ( typeof(rastermesh) != 'undefined' ) {
    viewExtents(rastermesh);
  } else if ( typeof(inflateGrp) != 'undefined' ) {
    viewExtents(inflateGrp);
  } else if ( typeof(fileParentGroup) != 'undefined' ) {
    viewExtents(fileParentGroup);
  } else {
    viewExtents(helper);
  };
}


//' Sets the input boxes to the current real-world sizes.  But why, well maybe we arent only going to scale/position via the input boxes?
// in which case we want to update the textboxes to match what we did from some other function'
function currentWorld() {
  if (fileParentGroup) {
    if ($( "#linkAspect" ).hasClass( "fa-link" )) {
      if (oldyscale != fileParentGroup.scale.y) {
        fileParentGroup.scale.x = fileParentGroup.scale.y;
      };
      if (oldxscale != fileParentGroup.scale.x) {
          fileParentGroup.scale.y = fileParentGroup.scale.x;
      };
    }

    $('#xpos').val(parseInt(fileParentGroup.position.x) + (laserxmax / 2) );
    $('#ypos').val(parseInt(fileParentGroup.position.y) + (laserymax / 2) );
    $('#scaleFactor').val((fileParentGroup.scale.x) * 100);
    fileParentGroup.position.z = 0.001;

    oldscalex = fileParentGroup.scale.x;
    oldyscale = fileParentGroup.scale.y;
  }

}

function putFileObjectAtZero() {
  // var hex  = 0xff0000;
  // var bbox = new THREE.BoundingBoxHelper( fileParentGroup, hex );
  // bbox.update();
  // scene.add( bbox );
  if (fileParentGroup) {
    imagePosition = $('#imagePosition').val()
    var bbox2 = new THREE.Box3().setFromObject(fileParentGroup);
    console.log('bbox for putFileObjectAtZero: Min X: ', (bbox2.min.x + (laserxmax / 2) ), '  Max X:', (bbox2.max.x + (laserxmax / 2) ), 'Min Y: ', (bbox2.min.y + (laserymax / 2) ), '  Max Y:', (bbox2.max.y + (laserymax / 2) ) );
    Xtofix = - (bbox2.min.x + (laserxmax / 2) );
    console.log('ImagePosition', imagePosition)
    if ( imagePosition == "TopLeft" ) {
      Ytofix = (laserymax /2 ) - bbox2.max.y;
    } else {
    Ytofix = - (bbox2.min.y + (laserymax / 2) );
    }
    console.log('X Offset', Xtofix)
    console.log('Y Offset', Ytofix)
    fileParentGroup.translateX(Xtofix);
    fileParentGroup.translateY(Ytofix);
    currentWorld();
  }

}

function putInflateGrpAtZero() {
  if (yflip == true) {
    inflateGrp.position.x = fileParentGroup.position.x
    inflateGrp.position.y = fileParentGroup.position.y
  } else {
    inflateGrp.position.x = fileParentGroup.position.x
    inflateGrp.position.y = fileParentGroup.position.y
  };
 currentWorld();

}
