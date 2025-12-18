<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ProductResource\Pages;
use App\Filament\Resources\ProductResource\RelationManagers;
use App\Models\Product;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Str;
use Filament\Forms\Set;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class ProductResource extends Resource
{
    protected static ?string $model = Product::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    protected static ?string $navigationGroup = 'Tienda';
    protected static ?int $navigationSort = 1;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Tabs::make('Tabs')
                    ->tabs([
                        Forms\Components\Tabs\Tab::make('Información Tienda')
                            ->schema([
                                Forms\Components\FileUpload::make('image')
                                    ->image()
                                    ->directory('products')
                                    ->columnSpanFull(),
                                Forms\Components\TextInput::make('name')
                                    ->label('Nombre del Producto')
                                    ->required()
                                    ->maxLength(255)
                                    ->live(onBlur: true)
                                    ->afterStateUpdated(fn(Set $set, ?string $state) => $set('slug', Str::slug($state))),
                                Forms\Components\TextInput::make('slug')
                                    ->required()
                                    ->maxLength(255)
                                    ->unique(ignoreRecord: true),
                                Forms\Components\RichEditor::make('description')
                                    ->label('Descripción Completa (Tienda)')
                                    ->columnSpanFull(),
                                Forms\Components\TextInput::make('price')
                                    ->required()
                                    ->numeric()
                                    ->prefix('$'),
                                Forms\Components\Toggle::make('is_active')
                                    ->label('Activo')
                                    ->required()
                                    ->default(true),
                            ]),
                        Forms\Components\Tabs\Tab::make('Destacado / Colección')
                            ->schema([
                                Forms\Components\Toggle::make('is_featured')
                                    ->label('Destacado en Colección')
                                    ->default(false),
                                Forms\Components\TextInput::make('subtitle')
                                    ->label('Subtítulo (ej: Reserva)')
                                    ->maxLength(255),
                                Forms\Components\TextInput::make('type')
                                    ->label('Tipo (ej: Blanco, Tinto)')
                                    ->maxLength(255),
                                Forms\Components\Textarea::make('featured_description')
                                    ->label('Descripción Corta (Para el Slider)')
                                    ->rows(3)
                                    ->columnSpanFull(),
                                Forms\Components\ColorPicker::make('accent_color')
                                    ->label('Color de Acento (Texto/Detalles)')
                                    ->default('#D4AF37'),
                            ]),
                    ])->columnSpanFull(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\ImageColumn::make('image'),
                Tables\Columns\TextColumn::make('name')
                    ->searchable()
                    ->sortable()
                    ->description(fn(Product $record): string => $record->subtitle ?? ''),
                Tables\Columns\TextColumn::make('price')
                    ->money('CLP')
                    ->sortable(),
                Tables\Columns\IconColumn::make('is_featured')
                    ->label('Colección')
                    ->boolean(),
                Tables\Columns\IconColumn::make('is_active')
                    ->boolean(),
                Tables\Columns\TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                Tables\Columns\TextColumn::make('updated_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListProducts::route('/'),
            'create' => Pages\CreateProduct::route('/create'),
            'edit' => Pages\EditProduct::route('/{record}/edit'),
        ];
    }
}
